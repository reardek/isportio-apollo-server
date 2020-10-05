const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  loginEmail: String,
  password: String,
  firstName: String,
  lastName: String,
  birthDate: Date,
  role: String,
  registeredDate: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = model("user", userSchema);
