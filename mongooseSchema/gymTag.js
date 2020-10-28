const { Schema, model, ObjectId } = require("mongoose");

const gymSchema = Schema({
  _id: ObjectId,
  name: String,
  namePL: String,
  gyms: {type: ObjectId, ref: "gym"}
});

module.exports = model("gymTag", gymSchema);
