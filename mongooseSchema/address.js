const { Schema, ObjectId, model } = require("mongoose");

const addressSchema = new Schema({
  _id: ObjectId,
  streetName: String,
  buildingNumber: String,
  flatNumber: String,
  city: String,
  zipCode: String,
  country: { type: ObjectId, ref: "country" },
  geoPoint: [Number],
});

module.exports = model("address", addressSchema);
