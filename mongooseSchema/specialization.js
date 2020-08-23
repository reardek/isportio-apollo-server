const { Schema } = require("mongoose");

const specializationSchema = new Schema({
  name: String,
  experience: String,
});

module.exports = specializationSchema;
