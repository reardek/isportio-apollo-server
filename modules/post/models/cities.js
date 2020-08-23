const { Schema, model } = require("mongoose");

const citiesSchema = new Schema({
  NAZWA: String,
  Gmina: String,
  Wojewodztwo: String
});

module.exports = model("cities", citiesSchema);
