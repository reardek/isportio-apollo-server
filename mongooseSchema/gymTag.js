const { Schema, model } = require("mongoose");

const gymSchema = Schema({
  name: String,
});

module.exports = model("gymTag", gymSchema);
