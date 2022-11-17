const express = require('express')
const Patient = require('../schema/patients.js')
const validKeys = require("../middleware/validKeys.js")

const router = express.Router()

//Add a new patient to the database.
router.post('/patient', async (req, res) => {
    try {
        console.log(`(${new Date().toLocaleString().replace(',', ' -')}) [POST /patient] Got request from IP: '${req.ip}' - Adding new patient`)
        const patient = new Patient(req.body)
        await patient.save()

        res.status(201).send(patient)
    } catch (e) {
        res.status(400).send(e.message)
    }
})

//Update an existing patient in the database.
router.patch('/patient', validKeys.checkUserId, async (req, res) => {
    try {
        console.log(`(${new Date().toLocaleString().replace(',', ' -')}) [PATCH /patient] Got request from IP: '${req.ip}' - Updating existing patient: '${req.query.userId}'`)
        const targetPatientId = {userId: req.query.userId}
        const updatedPatient = await Patient.findOneAndUpdate(targetPatientId, req.body)

        if (!updatedPatient) {
            res.status(404).send("Target patient not found!")
        } else {
            res.status(201).send("Patient info has been updated")
        }
    } catch(e) {
        res.status(400).send(e.message)
    }
})

//Fetch an patient with his id.
router.get('/patient', validKeys.checkUserId, async(req, res) => {
    try {
        console.log(`(${new Date().toLocaleString().replace(',', ' -')}) [GET /patient] Got request from IP: '${req.ip}' - Getting a patient data: '${req.query.userId}'`)
        const targetPatientId = {userId : req.query.userId}
        const targetPatient = await Patient.findOne(targetPatientId)

        if (!targetPatient) {
            res.status(404).send("Target patient not found!")
        } else {
            res.status(200).send(targetPatient)
        }
    } catch(e) {
        res.status(400).send(e.message)
    }
})


//Delete an existing patient.
router.delete('/patient', validKeys.checkUserId, async(req, res) => {
    try {
        console.log(`(${new Date().toLocaleString().replace(',', ' -')}) [DELETE /patient] Got request from IP: '${req.ip}' - Deleting a patient: '${req.query.userId}'`)
        const targetPatientId = {userId: req.query.userId}
        const targetPatient = await Patient.findOneAndDelete( targetPatientId)

        if (!targetPatient) {
            res.status(404).send("Target patient not found!")
        } else {
            res.status(201).send("Patient has been deleted!")
        }
    } catch(e) {
        res.status(400).send(e.message)
    }
})



module.exports = router