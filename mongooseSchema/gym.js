const { Schema, model, ObjectId } = require("mongoose");
const equipmentSchema = require("./equipment");

const gymSchema = Schema({
  gymTypeId: ObjectId,
  description: String,
  availability: Number,
  gymTags: [ObjectId],
  equipments: [equipmentSchema],
});

module.exports = model("gym", gymSchema);
module.exports.gymSchema = gymSchema;
