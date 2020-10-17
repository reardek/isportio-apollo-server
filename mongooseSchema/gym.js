const { Schema, model, ObjectId } = require("mongoose");
const equipmentSchema = require("./equipment");

const gymSchema = Schema({
  _id: ObjectId,
  sportObject: {type: ObjectId, ref: "sportObject"},
  gymType: {type: ObjectId, ref: "gymTag"},
  description: String,
  availability: Number,
  maxAvailability: Number,
  gymTags: [{type: ObjectId, ref: "gymTag"}],
  equipments: [String],
});

module.exports = model("gym", gymSchema);
module.exports.gymSchema = gymSchema;
