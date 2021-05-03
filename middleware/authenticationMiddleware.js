if (require("dotenv")) require("dotenv").config();
const jwt = require("jsonwebtoken");
const HttpError = require("../utils/httpError");

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header("x-auth-token");
  // check if not token
  if (!token) {
    throw new HttpError("Not Authenticated.", 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { id: decoded.id };

    next();
  } catch (err) {
    console.log(err);
    throw new HttpError("Invalid token.", 401);
  }
};
