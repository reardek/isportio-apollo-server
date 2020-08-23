const { Schema, model } = require("mongoose");
const specializationSchema = require("./specialization");

const trainerSchema = new Schema({
  firstName: String,
  lastName: String,
  specializations: [specializationSchema],
});

module.exports = model("trainer", trainerSchema);
