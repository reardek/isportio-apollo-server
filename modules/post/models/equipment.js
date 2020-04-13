const { Schema, model, SchemaType } = require("mongoose");

const equipmentSchema = Schema({
  name: String,
  equipment: Number,
});

module.exports = equipmentSchema;
module.exports = model("equipment", equipmentSchema);
