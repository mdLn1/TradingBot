let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let symbolSchema = new Schema({
  name: { type: String, required: true },
  isActive: { type: Boolean, default: true },
});

let symbolModel = mongoose.model("Symbols", symbolSchema);

module.exports = symbolModel;
