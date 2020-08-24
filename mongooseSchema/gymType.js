const { Schema, model } = require("mongoose");

const gymTypeSchema = Schema({
  name: String,
});

exports = model("gymType", gymTypeSchema);
