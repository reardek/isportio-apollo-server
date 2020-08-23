const { Schema, model, ObjectId } = require("mongoose");
const addressSchema = require("./address");
const { gymSchema } = require("./gym");

const sportObjectSchema = new Schema({
  name: String,
  address: addressSchema,
  gyms: [gymSchema],
  sportObjectOwnerId: ObjectId,
});

module.exports = model("sportObject", sportObjectSchema);
