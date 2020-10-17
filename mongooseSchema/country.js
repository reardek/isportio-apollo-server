const { Schema, model, ObjectId } = require("mongoose");

const countrySchema = new Schema({
  _id: ObjectId,
  code: String,
  longName: String,
});

module.exports = model("country", countrySchema);
