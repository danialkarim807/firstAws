const jwt = require("jsonwebtoken");
const path = require('path')
const User = require("../schema/users.js");
require('dotenv').config({ path: path.resolve(__dirname, '../config/.env') })

//Verify the jwt.
const verifyToken = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    if (!token) {
      return res.status(403).send("Authentication token is required.");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ userId: decoded._id, "tokens.token": token});
    if (!user) {
      throw new Error();
    }
    //add the user role to the request for further validation when performing a request.
    //NOTE: called clientRole to avoid overwriting if a request will send a userRole in the body
    else {
      req.clientRole = user.userRole
    }
    next()
  } catch (e) {
    return res.status(401).send("Invalid token!");
  }
};

module.exports = verifyToken;
