const dateCleaner = require('./dateCleaner.js')
const QuestionAnswer = require('../schema/questionAnswers.js')
const SensorData = require('../schema/sensorData.js')

//Get the last filled questionnaire or latest sensor data
async function getLatestData(schemaType, idList, userId) {
    let dataArr = []
    for (id of idList) {
    let queryAnswer
    let answerObj
    switch (schemaType) {
        case 'sensor':
            queryAnswer = await SensorData.find({deviceUuid: id, userId}, "-_id timeStamp deviceUuid sensorName sensorValue").sort({timeStamp: -1}).limit(1)
            answerObj = queryAnswer[0].toObject()
            answerObj.latestData = dateCleaner(answerObj.timeStamp.toString())
            delete answerObj.timeStamp
            break
        case 'answer':
            // NOTE: For questionnaire list window we need only latest one, but for dashboard we need latest two
            queryAnswer = await QuestionAnswer.find({questionnaireId: id, userId}, "-_id timeStamp questionnaireId score name").sort({timeStamp: -1}).limit(2)
            answerObj = {current: queryAnswer[0].toObject()}
            answerObj.current.latestData = dateCleaner(answerObj.current.timeStamp.toString())
            delete answerObj.current.timeStamp
            // if there is not only 1 answer from this type of questionnaire.
            if (queryAnswer.length > 1) {
                answerObj.previous = queryAnswer[1].toObject()
                answerObj.previous.latestData = dateCleaner(answerObj.previous.timeStamp.toString())
                delete answerObj.previous.timeStamp
            }
            break
        case 'statistics':
            console.log("Not implemented yet - 'getLatestData(statistics)'")
            break
    }
     dataArr = dataArr.concat(answerObj)
    }
    return dataArr
   }

module.exports = getLatestData