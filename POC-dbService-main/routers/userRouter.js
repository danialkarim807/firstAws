const express = require('express')
const User = require('../schema/users.js')
const validKeys = require("../middleware/validKeys.js")
const verifyToken = require('../middleware/verifyToken.js')

const router = express.Router()

//Add a new user to the database.
router.post('/user', async (req, res) => {
    try {
        console.log(`(${new Date().toLocaleString().replace(',', ' -')}) [POST /user] Got request from IP: '${req.ip}' - Adding new user`)
        const user = new User(req.body)
        await user.generateUserId()
        await user.save()

        res.status(201).send("User has been created!")
    } catch (e) {
        res.status(400).send(e.message)
    }
})

//Fetch an existing user's ID & role from the database.
router.post('/user/login', validKeys.checkUserLoginInfo, async (req, res) => {
    try {
        console.log(`(${new Date().toLocaleString().replace(',', ' -')}) [POST /user/login] Got request from IP: '${req.ip}' with body ${JSON.stringify(req.body)}`)
        const targetUser = await User.findByCredentials(req.body.email, req.body.password)
        const token = await targetUser.generateAuthToken()
        if (!targetUser) {
            res.status(404).send("Incorrect login email and/or password given. Please try again...")
        } else {
            res.status(200).send({userId: targetUser.userId, userRole: targetUser.userRole, token})
        }
    } catch (e) {
        res.status(400).send(e.message)
    }
})

//Update an existing user in the database.
router.patch('/user', [validKeys.checkUserId, verifyToken], async (req, res) => {
    try {
        console.log(`(${new Date().toLocaleString().replace(',', ' -')}) [PATCH /user] Got request from IP: '${req.ip}' - Updating existing user: '${req.query.userId}'`)
        const targetUserId = {userId: req.query.userId}
        const updates = Object.keys(req.body)
        const updatedUser = await User.findOne(targetUserId)

        if (!updatedUser) {
            res.status(404).send("Target user not found!")
        } else {
            updates.forEach((update) => updatedUser[update] = req.body[update])
            await updatedUser.save()
            res.status(201).send("User info has been updated")
        }
    } catch(e) {
        res.status(400).send(e.message)
    }
})

//Fetch an user with his id.
router.get('/user', [validKeys.checkUserId, verifyToken], async(req, res) => {
    try {
        console.log(`(${new Date().toLocaleString().replace(',', ' -')}) [GET /user] Got request from IP: '${req.ip}' - Getting a user data: '${req.query.userId}'`)
        const targetUserId = {userId: req.query.userId}
        const targetUser = await User.findOne(targetUserId)

        if (!targetUser) {
            res.status(404).send("Target user not found!")
        } else {
            res.status(200).send(targetUser)
        }        
    } catch(e) {
        res.status(400).send(e.message)
    }
})

//Delete an existing user.
router.delete('/user', [validKeys.checkUserId, verifyToken], async(req, res) => {
    try{
        console.log(`(${new Date().toLocaleString().replace(',', ' -')}) [DELETE /user] Got request from IP: '${req.ip}' - Deleting a user: '${req.query.userId}'`)
        const targetUserId = {userId: req.query.userId}
        const targetUser = await User.findOneAndDelete(targetUserId)

        if (!targetUser) {
            res.status(404).send("Target user not found!")
        } else {
            res.status(201).send("User has been deleted!")
        }
    } catch(e) {
        res.status(400).send(e.message)
    }
})



module.exports = router