const { Schema, model, ObjectId } = require("mongoose");

const sportObjectSchema = new Schema({
  _id: ObjectId,
  name: String,
  address: {
    _id: ObjectId,
    geoPoint: [Number],
    streetName: String,
    buildingNumber: String,
    flatNumber: String,
    city: String,
    zipCode: String,
    country: { type: ObjectId, ref: "country" },
  },
  gyms: [{ type: ObjectId, ref: "gym" }],
  sportObjectOwner: { type: ObjectId, ref: "sportObjectOwner" },
});

module.exports = model("sportObject", sportObjectSchema);
