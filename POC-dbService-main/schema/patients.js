const mongoose = require('mongoose')

const patientsSchema = mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type:String,
        required: true
    },
    age: {
        type: Number,
        required: true,
        validate(value) {
            if(!(0 < value < 120)) {
                throw new Error("Invalid age")
            }
        }
    },
    gender: {
        type: String,
        required: true,
    },
    devices: {
        type: Array,
        required: true,
        default: []
    },
    therapySessions: {
        type: Array,
        required: true,
        default: []
    },
    userId: {
        type: String,
        unique: true,
        required: true,
    }

})

patientsSchema.pre('findOneAndUpdate', function(next) {
    this.set({ updatedAt: new Date() });
    next()
})

const Patient = mongoose.model('Patients', patientsSchema)

module.exports = Patient