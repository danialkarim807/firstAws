const mongoose = require("mongoose");
const userDataConn = require('../config/userDataConn.js')

const scoreSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true
  }
});

const questionAnswerSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  timeStamp: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
  questionnaireId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  fillFrequency: {
    type: String,
  },
  answers: {
    type: [String | Array],
    required: true,
  },
  score: {
    type: [scoreSchema],
  }
});

const QuestionAnswer = userDataConn.model("QuestionAnswers", questionAnswerSchema);

module.exports = QuestionAnswer;
