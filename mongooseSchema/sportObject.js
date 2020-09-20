const { Schema, model, ObjectId } = require("mongoose");
const addressSchema = require("./address");
const { gymSchema } = require("./gym");

const sportObjectSchema = new Schema({
  name: String,
  address: [
    {
      type: ObjectId,
      ref: "address",
    },
  ],
  gyms: [gymSchema],
  sportObjectOwnerId: [ObjectId],
});

module.exports = model("sportObject", sportObjectSchema);
