const { Schema } = require("mongoose");

const addressSchema = new Schema({
  streetName: String,
  buildingNumber: Number,
  flatNumber: Number,
  zipCode: String,
  country: String,
});

module.exports = addressSchema;
