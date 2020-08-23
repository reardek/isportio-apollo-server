const { Schema } = require("mongoose");

const equipmentSchema = Schema({
  name: String,
  equipment: Number,
});

module.exports = equipmentSchema;
