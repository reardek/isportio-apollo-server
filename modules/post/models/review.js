const { Schema, model, ObjectId } = require("mongoose");

const reviewSchema = new Schema({
  description: String,
  starRate: Number,
  sportObjectId: ObjectId,
});

module.exports = model("review", reviewSchema);
