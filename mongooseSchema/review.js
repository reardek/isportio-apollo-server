const { Schema, model, ObjectId } = require("mongoose");

const reviewSchema = new Schema({
  _id: ObjectId,
  user: {type: ObjectId, ref: "user"},
  description: String,
  starRate: Number,
  sportObject: {type: ObjectId, ref: "sportObject"},
});

module.exports = model("review", reviewSchema);
