const mongoose = require('mongoose')
const userDataConn = require('../config/userDataConn.js')

const nowDate = new Date()

const statsSchema = mongoose.Schema({
    n_samples: {
        type: Number,
        required: true,
    },
    min: {
        type: Number,
        required: true
    },
    max: {
        type: Number,
        required: true
    },
    mean: {
        type: Number,
        required: true
    },
    median: {
        type: Number,
        required: true
    }
  });

const statisticsDataSchema = mongoose.Schema({
    type: {  // "sensorData" or "questionAnswer"
        // TODO: Add validation for the above structure
        type: String,
        required: true,
    },
    id: {   // sensorName or questionnaireId
        type: String,
        required: true
    },
    statistics: {
        type: statsSchema,
        required: true
    }
  });

const statisticSchema = mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    userId: {
        type: String,
        required: true,
    },
    dateAggregationType: {
        type: String,
        required: true,
        validate(value) {
            if (value != 'daily' && value != 'weekly' && value != 'monthly'){
                throw new Error('Invalid aggregation type!')
            }
        }
    },
    dateRange: {
        // FROM_DATE-TO_DATE
        // e.g.:
        //      daily:      2022.17.10-2022.17.10
        //      weekly:     2022.01.01-2022.07.01
        //      monthly:    2022.01.10-2022.31.10
        // TODO: Add validation for the above structure
        type: String,
        required: true,
        // default: nowDate.getFullYear()+'-'+(nowDate.getMonth()+1)+'-'+nowDate.getDate(),
        immutable: true
    },
    data: {
        type: [statisticsDataSchema],
        required: true,
        default: []
    }

})

statisticSchema.pre('findOneAndUpdate', function(next) {
    this.set({ updatedAt: new Date() });
    next()
})

const Statistics = userDataConn.model('Statistics', statisticSchema)

module.exports = Statistics