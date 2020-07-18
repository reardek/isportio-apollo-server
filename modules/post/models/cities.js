const { Mongoose } = require("mongoose");

const { Schema, model } = require("mongoose");

const citiesSchema = new Schema({
  NAZWA: String,
});

module.exports = model("cities", citiesSchema);
