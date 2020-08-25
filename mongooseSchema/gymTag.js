const { Schema, model } = require("mongoose");

const gymSchema = Schema({
  name: String,
  description: String,
});

module.exports = model("gymTag", gymSchema);
