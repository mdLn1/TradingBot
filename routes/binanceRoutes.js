const router = require("express").Router();
const { check } = require("express-validator");
const { getPrices, getBalances } = require("../controllers/binanceController");

//@route GET api/auth/prices
//@desc Get prices
//@access Public
router.get("/prices", exceptionHandler(getPrices));

//@route GET api/auth/balances
//@desc Get balances
//@access Public
router.get("/balances", exceptionHandler(getBalances));

module.exports = router;
