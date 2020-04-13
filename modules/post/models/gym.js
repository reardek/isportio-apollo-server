const { Schema, model, ObjectId } = require("mongoose");
//const { equipmentSchema } = require("./equipment");

const equipmentSchema = Schema({
  name: String,
  quantity: Number,
});

const gymSchema = Schema({
  gymTypeId: ObjectId,
  description: String,
  reservationId: ObjectId,
  equipments: [equipmentSchema],
});

module.exports = model("gym", gymSchema);
