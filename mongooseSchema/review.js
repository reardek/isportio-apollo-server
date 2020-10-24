const { Schema, model, ObjectId } = require("mongoose");

const reviewSchema = new Schema({
  _id: ObjectId,
  user: {type: ObjectId, ref: "user"},
  description: String,
  starRate: Number,
  gym: {type: ObjectId, ref: "gym"},
});

module.exports = model("review", reviewSchema);
