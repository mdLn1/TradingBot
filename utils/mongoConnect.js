const mongoose = require("mongoose");

require("dotenv").config();

module.exports = () => {
  mongoose
    .connect(process.env.MONGO_CONNECTION, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDB connected");
    })
    .catch((err) => {
      console.log("Error on start: " + err.stack);
      process.exit(1);
    });
};
