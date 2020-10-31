const mongoose = require("mongoose");
const Reservation = require("../../mongooseSchema/reservation");

module.exports = {
  Query: {
    reservations: () => Reservation.find({}),
    userReservations: (parent, args) =>
      Reservation.find({ userId: args.userId }),
  },
  Mutation: {
    addReservation: (parent, reservation) => {
      const newReservation = new Reservation({
        _id: new mongoose.Types.ObjectId(),
        title: reservation.title,
        startDateTime: reservation.startDateTime,
        endDateTime: reservation.endDateTime,
        user: reservation.user,
        gym: reservation.gym,
      });
      return newReservation.save();
    },
  },
};
