const { Schema, model, ObjectId } = require("mongoose");

const gymTypeSchema = Schema({
  _id: ObjectId,
  name: String,
  namePL: String,
  gyms: [{type: ObjectId, ref: "gym"}]
});

module.exports = model("gymType", gymTypeSchema);
