const mongoose = require('mongoose')

const deviceSchema = mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    uuid: {
        type: String,
        unique: true,
        required: true
    },
    deviceName: {
        type: String,
        required: true
    },
    firmwareVersion: {
        type: String,
        required: true
    },
    osVersion: {
        type: String,
        // required: true
    },
    deviceType: {
        type: String,
        required: true
    }
})


deviceSchema.pre('findOneAndUpdate', function(next) {
    this.set({ updatedAt: new Date() });
    next()
})

const Device = mongoose.model('Devices', deviceSchema)

module.exports = Device