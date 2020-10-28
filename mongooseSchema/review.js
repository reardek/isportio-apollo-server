const { Schema, model, ObjectId } = require("mongoose");

const reviewSchema = new Schema({
  _id: ObjectId,
  user: {type: ObjectId, ref: "user"},
  description: String,
  starRate: Number,
  gym: {type: ObjectId, ref: "gym"},
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = model("review", reviewSchema);
