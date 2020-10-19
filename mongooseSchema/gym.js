const { Schema, model, ObjectId } = require("mongoose");
const equipmentSchema = require("./equipment");

const gymSchema = Schema({
  _id: ObjectId,
  sportObject: {type: ObjectId, ref: "sportObject"},
  gymType: {type: ObjectId, ref: "gymType"},
  name: String,
  description: String,
  availability: Number,
  maxAvailability: Number,
  gymTags: [{type: ObjectId, ref: "gymTag"}],
  equipments: [{type: ObjectId, ref: "equipment"}],
});

module.exports = model("gym", gymSchema);
module.exports.gymSchema = gymSchema;
