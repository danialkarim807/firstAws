const express = require("express");
const QuestionAnswers = require("../schema/questionAnswers.js");
const validKeys = require("../middleware/validKeys.js");
const scoreCalc = require("../helpers/scoreCalculator.js");
const getDates = require("../helpers/dateManager.js");
const getLatestData = require("../helpers/getLatestData.js");

const router = express.Router();

//Add a new questionnaire answers to the database.
router.post("/questionAnswer", validKeys.checkAnswers, async (req, res) => {
  try {
    console.log(
      `(${new Date()
        .toLocaleString()
        .replace(",", " -")}) [POST /questionAnswer] Got request from IP: '${
        req.ip
      }' - Adding new question answers data`
    );
    const questAnswersData = QuestionAnswers(req.body);
    const scoreObj = scoreCalc(questAnswersData.questionnaireId, questAnswersData.answers);
    questAnswersData.score = scoreObj;
    await questAnswersData.save();

    res.status(201).send(questAnswersData.score);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

//Fetch all questionnaire answers of the requested questionnaire type, of a specifc user.
router.get("/questionAnswer", validKeys.checkUserId, async (req, res) => {
  try {
    console.log(
      `(${new Date()
        .toLocaleString()
        .replace(",", " -")}) [GET /questionAnswer] Got request from IP: '${
        req.ip
      }' - Getting questionnaire answers data: '${req.query.userId}'`
    );
    let questionAnswersData = [];
    const userId = req.query.userId;
    //If no dates has been given return all of the user questionnaire answers.
    if (!req.query.date) {
      questionAnswersData = await QuestionAnswers.find({ userId });
    } else {
      const [startDate, endDate] = getDates(req.query.date);
      questionAnswersData = await QuestionAnswers.find({
        timeStamp: { $gte: startDate, $lte: endDate },
        userId,
      });
    }

    //If no data has been found.
    if (!questionAnswersData.length) {
      res.status(404).send("User data not found!");
    } else {
      res.status(200).send(questionAnswersData);
    }
  } catch (e) {
    res.status(400).send(e.message);
  }
});

//Fetch all questionnaire that were last filled by the user
router.get("/questionAnswer/last", validKeys.checkUserId, async (req, res) => {
  try {
    console.log(
      `(${new Date()
        .toLocaleString()
        .replace(",", " -")}) [GET /questionAnswer/last] Got request from IP: '${
        req.ip
      }' - Getting questionnaire answers last filled data: '${req.query.userId}'`
    );
    let questionAnswersData = [];
    let lastFillData = []
    questionAnswersData = await QuestionAnswers.find({
      userId: req.query.userId,
    });
    //If no data has been found.
    if (!questionAnswersData.length) {
      res.status(404).send("User data not found!")
    } else {
      let questionnaireIdList = [...new Set(questionAnswersData.map(item => item.questionnaireId))];
      lastFillData = await getLatestData('answer', questionnaireIdList, req.query.userId)
      res.status(200).send(lastFillData);
    }
    
  } catch (e) {
    res.status(400).send(e.message);
  }
});

module.exports = router;

