const { Schema, model } = require("mongoose");

const gymTypeSchema = Schema({
  name: String,
});

module.exports = model("gymType", gymTypeSchema);
