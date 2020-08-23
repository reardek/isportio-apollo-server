const { Schema } = require("mongoose");

const countrySchema = new Schema({
  code: String,
  longName: String,
});

module.exports = countrySchema;
