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
        startDateTime: reservation.startDateTime,
        endDateTime: reservation.endDateTime,
        userId: reservation.userId,
        gymId: reservation.gymId,
      });
      return newReservation.save();
    },
  },
};
