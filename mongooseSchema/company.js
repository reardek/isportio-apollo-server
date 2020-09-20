const { Schema, model, ObjectId } = require("mongoose");
const addressSchema = require("./address");

const companySchema = new Schema({
  name: String,
  companyCode: String,
  address: [{ type: ObjectId, ref: "address" }],
});

module.exports = model("company", companySchema);
