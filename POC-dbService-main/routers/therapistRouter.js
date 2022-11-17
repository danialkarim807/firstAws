const express = require('express')
const Therapist = require('../schema/therapists.js')
const validKeys = require("../middleware/validKeys.js")

const router = express.Router()

//Add a new therapist to the database.
router.post('/therapist', async (req, res) => {
    try {
        console.log(`(${new Date().toLocaleString().replace(',', ' -')}) [POST /therapist] Got request from IP: '${req.ip}' - Adding new therapist`)
        const therapist = new Therapist(req.body)
        await therapist.save()

        res.status(201).send(therapist)
    } catch (e) {
        res.status(400).send(e.message)
    }
})

//Update an existing therapist in the database.
router.patch('/therapist', validKeys.checkUserId, async (req, res) => {
    try {
        console.log(`(${new Date().toLocaleString().replace(',', ' -')}) [PATCH /therapist] Got request from IP: '${req.ip}' - Updating existing therapist: '${req.query.userId}'`)
        const targetTherapistId = {userId: req.query.userId}
        const targetTherapist = await Therapist.findOneAndUpdate(targetTherapistId , req.body)

        if (!targetTherapist) {
            res.status(404).send("Targer therapist not found!")
        } else {
            res.status(201).send("Therapist info has been updated")
        }
    } catch(e) {
        res.status(400).send(e.message)
    }
})

//Fetch an therapist with his id.
router.get('/therapist', validKeys.checkUserId, async(req, res) => {
    try {
        console.log(`(${new Date().toLocaleString().replace(',', ' -')}) [GET /therapist] Got request from IP: '${req.ip}' - Getting a therapist data: '${req.query.userId}'`)
        const targetTherapistId  = {userId : req.query.userId}
        const targetTherapist = await Therapist.findOne(targetTherapistId)

        if (!targetTherapist) {
            res.status(404).send("Target therapist not found!")
        } else {
            res.status(200).send(targetTherapist)
        }
    } catch(e) {
        res.status(400).send(e.message)
    }
})

//Fetch a therapist's patients list with his id.
router.get('/therapist/patients', validKeys.checkUserId, async(req, res) => {
    try {
        console.log(`(${new Date().toLocaleString().replace(',', ' -')}) [GET /therapist/patients] Got request from IP: '${req.ip}' with query ${JSON.stringify(req.query)}`)
        const targetTherapistId = {userId : req.query.userId}
        const targetTherapist = await Therapist.findOne(targetTherapistId)

        if (!targetTherapist) {
            res.status(404).send("Incorrect therapist user ID given.")
        } else {
            const targetTherapistRetInfo = targetTherapist.toObject().patients
            res.status(200).send(targetTherapistRetInfo)
        }
    } catch(e) {
        res.status(400).send(e.message)
    }
})

//Delete an existing therapist.
router.delete('/therapist', validKeys.checkUserId, async(req, res) => {
    try{
        console.log(`(${new Date().toLocaleString().replace(',', ' -')}) [DELETE /therapist] Got request from IP: '${req.ip}' - Deleting a therapist: '${req.query.userId}'`)
        const targetTherapistId  = {userId: req.query.userId}
        const targetTherapist = await Therapist.findOneAndDelete(targetTherapistId)

        if (!targetTherapist) {
            res.status(404).send("Target therapist not found!")
        } else {
            res.status(201).send("Therapist has been deleted!")
        }
    } catch(e) {
        res.status(400).send(e.message)
    }
})



module.exports = router