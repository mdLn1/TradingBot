if (require("dotenv")) require("dotenv").config();

const Binance = require("node-binance-api");

const binance = new Binance().options({
  APIKEY: process.env.BINANCE_KEY,
  APISECRET: process.env.BINANCE_SECRET,
  useServerTime: true,
  recvWindow: 4000,
  test: true,
});

module.exports = { binance };
