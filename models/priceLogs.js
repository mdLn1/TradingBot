let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let priceLogsSchema = new Schema({
  symbolName: { type: String, required: true },
  loggedDate: { type: Date, default: Date.now },
  price: { type: mongoose.Types.Decimal128, required: true },
});

let priceLogsModel = mongoose.model("PriceLogs", priceLogsSchema);

module.exports = priceLogsModel;
