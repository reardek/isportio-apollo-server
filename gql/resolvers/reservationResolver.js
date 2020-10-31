const mongoose = require("mongoose");
const Reservation = require("../../mongooseSchema/reservation");
const User = require("../../mongooseSchema/user");
const Gym = require("../../mongooseSchema/gym");

module.exports = {
  Query: {
    reservations: () => Reservation.find({}),
    userReservations: (parent, args) =>
      Reservation.find({ userId: args.userId }),
  },
  Reservation: {
    user: (parent) => User.findOne({reservations: parent._id }),
    gym: (parent) => Gym.findOne({ reservations: parent._id }),
  },
  Mutation: {
    addReservation: async (parent, reservation) => {
      const newReservation = new Reservation({
        _id: new mongoose.Types.ObjectId(),
        title: reservation.title,
        startDateTime: reservation.startDateTime,
        endDateTime: reservation.endDateTime,
        user: reservation.user,
        gym: reservation.gym,
      });
      await User.updateOne(
        { _id: newReservation.user },
        { $push: { reservations: newReservation._id } }
      );
      await Gym.updateOne(
        { _id: newReservation.gym },
        { $push: { reservations: newReservation._id } }
      );
      return newReservation.save();
    },
  },
};
