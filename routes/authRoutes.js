const router = require("express").Router();
const { check } = require("express-validator");
const exceptionHandler = require("../utils/exceptionHandler");
const { remindCredentials, login } = require("../controllers/authController");

//@route POST api/auth/login
//@desc Authenticate user
//@access Public
router.post("/login", login);

//@route GET api/auth/remind-credentials
//@desc Remind credentials
//@access Public
router.get("/remind-credentials", exceptionHandler(remindCredentials));

module.exports = router;
