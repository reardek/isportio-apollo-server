const { Schema, model, ObjectId } = require("mongoose");

const reservationSchema = Schema({
  startDateTime: Date,
  endDateTime: Date,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  user: {type: ObjectId, ref: "user"},
  gym: {type: ObjectId, ref: "gym"},
});

module.exports = model("reservation", reservationSchema);
