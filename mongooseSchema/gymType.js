const { Schema, model, ObjectId } = require("mongoose");

const gymTypeSchema = Schema({
  _id: ObjectId,
  name: String,
  namePL: String
});

module.exports = model("gymType", gymTypeSchema);
