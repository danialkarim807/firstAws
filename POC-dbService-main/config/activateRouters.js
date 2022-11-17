// Assets database routers
const userRouter = require('../routers/userRouter.js')
const therapistRouter = require('../routers/therapistRouter.js')
const patientRouter = require('../routers/patientRouter.js')
const deviceRouter = require('../routers/deviceRouter.js')
const questionnaireRouter = require('../routers/questionnaireRouter.js')

// UserData database routers
const sensorRouter = require('../routers/sensorRouter.js')
const questionAnswerRouter = require('../routers/questionAnswerRouter.js')
const statisticsRouter = require('../routers/statisticsRouter.js')

function activateRouters (app) {
    app.use(userRouter)
    app.use(therapistRouter)
    app.use(patientRouter)
    app.use(deviceRouter)
    app.use(questionnaireRouter)

    app.use(sensorRouter)
    app.use(questionAnswerRouter)
    app.use(statisticsRouter)
}

module.exports = activateRouters
