const { Schema, model, ObjectId } = require("mongoose");
const addressSchema = require("./address");

const sportObjectSchema = new Schema({
  name: String,
  address: addressSchema,
  sportObjectOwnerId: ObjectId,
});

module.exports = model("sportObject", sportObjectSchema);
