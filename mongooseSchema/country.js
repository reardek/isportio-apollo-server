const { Schema, model, ObjectId } = require("mongoose");

const countrySchema = new Schema({
  _id: ObjectId,
  code: String,
  longName: String,
  address: [{ type: ObjectId, ref: "address" }],
});

module.exports = model("country", countrySchema);
