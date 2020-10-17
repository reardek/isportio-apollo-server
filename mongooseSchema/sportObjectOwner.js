const { Schema, model, ObjectId } = require("mongoose");

const sportObjectOwnerSchema = new Schema({
  _id: ObjectId,
  firstName: String,
  lastName: String,
  company: {type: ObjectId, ref: "company"},
});

module.exports = model("sportObjectOwner", sportObjectOwnerSchema);
