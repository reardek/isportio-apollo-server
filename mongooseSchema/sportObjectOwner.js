const { Schema, model, ObjectId } = require("mongoose");

const sportObjectOwnerSchema = new Schema({
  _id: ObjectId,
  firstName: String,
  lastName: String,
  company: { type: ObjectId, ref: "company" },
  sportObject: { type: ObjectId, ref: "sportObject" },
});

module.exports = model("sportObjectOwner", sportObjectOwnerSchema);
