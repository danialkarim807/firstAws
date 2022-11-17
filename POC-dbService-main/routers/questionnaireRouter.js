const express = require("express");
const Questionnaire = require("../schema/questionnaires.js");
const validKeys = require("../middleware/validKeys.js");

const router = express.Router();

//Add a new questionnaire to the database.
router.post("/questionnaire", validKeys.checkSections, async (req, res) => {
  try {
    console.log(
      `(${new Date()
        .toLocaleString()
        .replace(",", " -")}) [POST /questionnaire] Got request from IP: '${
        req.ip
      }' - Adding new questionnaire`
    );
    const questionnaire = new Questionnaire(req.body);
    await questionnaire.save();

    res.status(201).send(questionnaire);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

//Update an existing questionnaire in the database.
router.patch(
  "/questionnaire",
  validKeys.checkQuestionnaireId,
  async (req, res) => {
    try {
      console.log(
        `(${new Date()
          .toLocaleString()
          .replace(",", " -")}) [PATCH /questionnaire] Got request from IP: '${
          req.ip
        }' - Updating existing questionnaire: '${req.query.questionnaireId}'`
      );
      const targetQuestionnaireId = {
        questionnaireId: req.query.questionnaireId,
      };
      const updatedQuestionnaire = await Questionnaire.findOneAndUpdate(
        targetQuestionnaireId,
        req.body
      );

      if (!updatedQuestionnaire) {
        res.status(404).send("Target questionnaire not found!");
      } else {
        res.status(201).send("Questionnaire info has been updated");
      }
    } catch (e) {
      res.status(400).send(e.message);
    }
  }
);

//Fetch an questionnaire with his id.
router.get(
  "/questionnaire",
  validKeys.checkQuestionnaireId,
  async (req, res) => {
    try {
      console.log(
        `(${new Date()
          .toLocaleString()
          .replace(",", " -")}) [GET /questionnaire] Got request from IP: '${
          req.ip
        }' - Getting a questionnaire data: '${req.query.questionnaireId}'`
      );
      const targetQuestionnaireId = {
        questionnaireId: req.query.questionnaireId,
      };
      const targetQuestionnaire = await Questionnaire.findOne(
        targetQuestionnaireId
      );

      if (!targetQuestionnaire) {
        res.status(404).send("Target questionnaire not found!");
      } else {
        res.status(200).send(targetQuestionnaire);
      }
    } catch (e) {
      res.status(400).send(e.message);
    }
  }
);

//Fetch all existing questionnaire list
router.get("/questionnaire/all", async (req, res) => {
  try {
    console.log(
      `(${new Date()
        .toLocaleString()
        .replace(",", " -")}) [GET /questionnaire/all] Got request from IP: ${
        req.ip
      }`
    );
    const questionnaireList = await Questionnaire.find();
    const questionnaireRetInfoList = questionnaireList.map(questionnaire => ({questionnaireId: questionnaire.questionnaireId, name: questionnaire.name}) )
    res.status(200).send(questionnaireRetInfoList);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

//Delete an existing questionnaire.
router.delete(
  "/questionnaire",
  validKeys.checkQuestionnaireId,
  async (req, res) => {
    try {
      console.log(
        `(${new Date()
          .toLocaleString()
          .replace(",", " -")}) [DELETE /questionnaire] Got request from IP: '${
          req.ip
        }' - Deleting a questionnaire: '${req.query.questionnaireId}'`
      );
      const targetQuestionnaireId = {
        questionnaireId: req.query.questionnaireId,
      };
      const targetQuestionnaire = await Questionnaire.findOneAndDelete(
        targetQuestionnaireId
      );

      if (!targetQuestionnaire) {
        res.status(404).send("Target questionnaire not found!");
      } else {
        res.status(201).send("Questionnaire has been deleted!");
      }
    } catch (e) {
      res.status(400).send(e.message);
    }
  }
);

module.exports = router;
