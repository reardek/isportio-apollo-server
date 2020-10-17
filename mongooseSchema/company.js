const { Schema, model, ObjectId } = require("mongoose");
const addressSchema = require("./address");

const companySchema = new Schema({
  _id: ObjectId,
  name: String,
  companyCode: String,
  address: { type: ObjectId, ref: "address" },
});

module.exports = model("company", companySchema);
