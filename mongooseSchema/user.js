const { Schema, model, ObjectId } = require("mongoose");

const userSchema = new Schema({
  _id: ObjectId,
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
  reviews: [{type: ObjectId, ref: "review"}],
  reservations: [{type: ObjectId, ref: "reservation"}]
});

module.exports = model("user", userSchema);
