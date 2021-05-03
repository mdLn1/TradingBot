const { binance } = require("../utils/binanceApi");

const getBalances = async (higherThan, lowerThan) => {
  const balances = await binance.balance();
  const listOfBalances = Object.entries(balances).map(([key, prop]) => {
    return {
      symbol: key,
      available: prop.available,
      onOrder: prop.onOrder,
    };
  });
  if (higherThan) {
    return listOfBalances.filter((el) => el.available > higherThan);
  }
  if (lowerThan) {
    return listOfBalances.filter((el) => el.available < lowerThan);
  }
  return listOfBalances;
};

const getPrices = async (symbols) => {};

const saveCurrentPrice = async (symbol, )

module.exports = { getBalances };
