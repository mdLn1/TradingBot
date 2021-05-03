if (require("dotenv")) require("dotenv").config();
const mongoConnect = require("../mongoConnect");
const Symbols = require("../../models/symbols");

const addSymbol = async (symbolName) => {
  mongoConnect();

  const foundSymbol = await Symbols.findOne({ name: symbolName });
  if (foundSymbol) {
    throw new Exception("Symbol name already exists");
  }

  let newSymbol = new Symbols({
    name: symbolName,
  });

  await newSymbol.save();

  return newSymbol;
};

const getAllSymbols = async (isActive = null) => {
  mongoConnect();

  if (typeof isActive === "boolean") {
    return await Symbols.find({ isActive: isActive });
  }

  return await Symbols.find({});
};

module.exports = { addSymbol, getAllSymbols };
