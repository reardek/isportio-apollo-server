const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  login: String,
  password: String,
  name: String,
  surname: String,
  age: Number,
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = model("user", userSchema);
