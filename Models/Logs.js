const { model, Schema } = require("mongoose");

const logSchema = new Schema({
  Guild: String,
  Channel: String,
});

module.exports = model("Logs", logSchema);
