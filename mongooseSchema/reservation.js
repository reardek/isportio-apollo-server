const { Schema, model, ObjectId } = require("mongoose");

const reservationSchema = Schema({
  startDateTime: Date,
  endDateTime: Date,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  userId: ObjectId,
  gymId: ObjectId,
});

module.exports = model("reservation", reservationSchema);
