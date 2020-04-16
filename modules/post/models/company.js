const { Schema, model } = require("mongoose");
const addressSchema = require("./address");

const companySchema = new Schema({
    name: String,
    companyCode: String,
    address: addressSchema
})