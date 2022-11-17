const validScopes = ["daily", "weekly", "monthly"];

const checkSensorKeys = async (req, res, next) => {
  try {
    if (!req.query.userId) {
      throw new Error(
        "Missing userId value!"
      );
    }
    if (!req.query.scope) {
      throw new Error("missing scope value!");
    } else if (!validScopes.includes(req.query.scope)) {
      throw new Error(
        "Invalid scope!, please choose between: daily, weekly, monthly."
      );
    }
    if (!req.query.date) {
      throw new Error(
        "missing date value!" 
      );
    }
    next();
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const checkUuid = async (req, res, next) => {
  try {
    if (!req.query.uuid) {
      throw new Error(
        "Missing uuid value!"
      );
    }
    next();
  } catch (e) {
    res.status(400).send(e.message);
  }
};

// TODO: Unify different IDs
const checkUserId = async (req, res, next) => {
  try {
    if (!req.query.userId) {
      throw new Error(
        "Missing 'userId' value."
      );
    }
    next();
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const checkQuestionnaireId = async (req, res, next) => {
  try {
    if (!req.query.questionnaireId) {
      throw new Error(
        "Missing 'questionnaireId' value."
      );
    }
    next();
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const checkUserLoginInfo = async (req, res, next) => {
  try {
    console.log(req.body.email)
    console.log(req.body.password)
    if (!req.body.email || !req.body.password) {
      throw new Error(
        "Missing 'email' and/or 'password' values."
      )
    }
    next();
  } catch (e) {
    res.status(400).send(e.message);
  }
};

const checkSections = async(req, res, next) => {
  try {
    if (!req.body.sections) {
      console.log("... failed 'checkSections' validation - missing 'sections' key.")
      throw new Error("Missing 'sections' key.") }
      next()
  } catch (e) {
    res.status(400).send(e.message)
  }
}

const checkAnswers = async(req, res, next) => {
  try {
    if (!req.body.answers) {
      console.log("... failed 'checkAnswers' validation - missing 'answers' key.")
      throw new Error("Missing 'answers' key.") }
      next()
  } catch (e) {
    res.status(400).send(e.message)
  }
}

module.exports = { checkSensorKeys, checkUuid, checkUserId, checkQuestionnaireId, checkUserLoginInfo, checkSections, checkAnswers };
