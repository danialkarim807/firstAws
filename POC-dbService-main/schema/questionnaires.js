const validator = require("validator");
const mongoose = require("mongoose");

const questionSchema = mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  instructions: {
    type: String,
    required: mongoose.Schema.Types.String.checkRequired(v => typeof v === 'string'),
  },
  type: {
      type: String,
      required: true,
  },
  answers: {
      type: Array,
  },
  scaleMin: {
      type: String
  },
  scaleMax: {
      type: String
  },
});

const sectionSchema = mongoose.Schema({
  name: {
    type: String,
    required: mongoose.Schema.Types.String.checkRequired(v => typeof v === 'string'),
  },
  instructions: {
    type: String,
    required: mongoose.Schema.Types.String.checkRequired(v => typeof v === 'string'),
  },
  questions: {
    type: [questionSchema],
    required: true,
  }
});

const questionnaireSchema = mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  questionnaireId: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    unique: true,
    required: true,
  },
  fillFrequency: {
    type: String,
  },
  sections: {
    type: [sectionSchema],
    required: true,
  },
});
questionnaireSchema.pre('findOneAndUpdate', function(next) {
  this.set({ updatedAt: new Date() });
  next()
})

const Questionnaire = mongoose.model("Questionnaires", questionnaireSchema);

module.exports = Questionnaire;
