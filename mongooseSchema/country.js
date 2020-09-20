const { Schema, model } = require("mongoose");

const countrySchema = new Schema({
  code: String,
  longName: String,
});

module.exports = model("country", countrySchema);
