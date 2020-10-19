const { Schema, model, ObjectId } = require("mongoose");

const equipmentSchema = Schema({
  _id: ObjectId,
  name: String,
  namePL: String,
});

module.exports = model("equipment", equipmentSchema);
