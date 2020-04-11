const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  login: String,
  password: String,
  name: String,
  surname: String,
  age: Number,
});

module.exports = model("user", userSchema);
