const { Schema, model, ObjectId } = require("mongoose");

const reviewSchema = new Schema({
  description: String,
  starRate: Number,
  sportObject: {type: ObjectId, ref: "sportObject"},
});

module.exports = model("review", reviewSchema);
