const { Schema, model, ObjectId } = require("mongoose");

const sportObjectSchema = new Schema({
  _id: ObjectId,
  name: String,
  address: { type: ObjectId, ref: "address" },
  gyms: [{ type: ObjectId, ref: "gym" }],
  sportObjectOwner: { type: ObjectId, ref: "sportObjectOwner" },
  reviews: [{type: ObjectId, ref: "review"}]
});

module.exports = model("sportObject", sportObjectSchema);
