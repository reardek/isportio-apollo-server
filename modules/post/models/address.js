const { Schema } = require("mongoose");

const addressSchema = new Schema({
  streetName: String,
  buildingNumber: String,
  flatNumber: String,
  city: String,
  zipCode: String,
  country: String,
});

module.exports = addressSchema;
