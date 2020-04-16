const { Schema, model, ObjectId } = require("mongoose");

const sportObjectOwnerSchema = new Schema({
  firstName: String,
  lastName: String,
  companyId: ObjectId,
});

module.exports = model("sportObjectOwner", sportObjectOwnerSchema);
