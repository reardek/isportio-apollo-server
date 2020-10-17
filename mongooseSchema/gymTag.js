const { Schema, model, ObjectId } = require("mongoose");

const gymSchema = Schema({
  _id: ObjectId,
  name: String,
  namePL: String
});

module.exports = model("gymTag", gymSchema);
