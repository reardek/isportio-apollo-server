const { Schema } = require("mongoose");
const countrySchema = require("./country");

const addressSchema = new Schema({
  streetName: String,
  buildingNumber: String,
  flatNumber: String,
  city: String,
  zipCode: String,
  country: countrySchema,
});

module.exports = addressSchema;
