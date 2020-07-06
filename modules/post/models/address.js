const { Schema } = require("mongoose");

const addressSchema = new Schema({
  streetName: String,
  buildingNumber: Number,
  flatNumber: Number,
  city: String,
  zipCode: String,
  country: String,
});

module.exports = addressSchema;
