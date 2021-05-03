const { validationResult } = require("express-validator");

module.exports = function errorChecker(req, res, next) {
  const { errors } = validationResult(req);
  if (errors.length > 0) {
   return res
      .status(400)
      .json({ errors: [...new Set(errors.map((el) => el.msg))] })
      .end();
  }
  next();
};
