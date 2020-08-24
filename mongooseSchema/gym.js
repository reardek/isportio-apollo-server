const { Schema, model, ObjectId } = require("mongoose");
const equipmentSchema = require("./equipment");

const gymSchema = Schema({
  gymTypeId: ObjectId,
  description: String,
  availability: Number,
  sportObjectId: ObjectId,
  equipments: [equipmentSchema],
});

exports = model("gym", gymSchema);
module.exports.gymSchema = gymSchema;
