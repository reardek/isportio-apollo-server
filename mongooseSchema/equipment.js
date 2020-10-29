const { Schema, model, ObjectId } = require("mongoose");

const equipmentSchema = Schema({
  _id: ObjectId,
  name: String,
  namePL: String,
  gyms: {type: ObjectId, ref: "gym"}
});

module.exports = model("equipment", equipmentSchema);
