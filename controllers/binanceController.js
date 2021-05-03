if (require("dotenv")) require("dotenv").config();
const HttpError = require("../utils/httpError");
const { binance } = require("../utils/binanceApi");

async function getPrices(req, res) {
  return res.status(200).json({ prices: await binance.prices() });
}

async function getBalances(req, res) {
  return res.status(200).json({ balances: await binance.balance() });
}

module.exports = { getPrices, getBalances };
