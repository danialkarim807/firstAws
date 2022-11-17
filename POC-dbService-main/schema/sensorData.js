const mongoose = require('mongoose')
const userDataConn = require('../config/userDataConn.js')

const sensorDataSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    timeStamp: {
        type: Date,
        default: Date.now,
        immutable: true
    },
    deviceUuid: {
        type: String,
        required: true
    },
    sensorName: {
        type: String,
        required: true
    },
    sensorValue: {
        type: String,
        required: true
    }

})

const SensorData = userDataConn.model('SensorsData', sensorDataSchema)

module.exports = SensorData