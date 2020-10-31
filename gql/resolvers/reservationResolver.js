const mongoose = require("mongoose");
const Reservation = require("../../mongooseSchema/reservation");
const User = require("../../mongooseSchema/user");
const Gym = require("../../mongooseSchema/gym");

module.exports = {
  Query: {
    reservations: () => Reservation.find({}),
    userReservations: (parent, args) => Reservation.find({ user: args.user }),
  },
  Reservation: {
    user: (parent) => User.findOne({ reservations: parent._id }),
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
    delReservationById: async (parent, { reservation }) => {
      const reservationToDel = await Reservation.findById(reservation);
      await Reservation.deleteOne({ _id: reservation });
      await User.updateOne(
        { reservations: reservation },
        { $pull: { reservations: reservation } }
      );
      await Gym.updateOne(
        { reservations: reservation },
        { $pull: { reservations: reservation } }
      );
      return reservationToDel;
    },
    updateReservationById: async (
      parent,
      { reservation, title, startDateTime, endDateTime, gym }
    ) => {
      await Gym.updateOne(
        { reservations: reservation },
        { $pull: { reservations: reservation } }
      );
      await Gym.updateOne(
        { _id: gym },
        { $push: { reservations: reservation } }
      );
      await Reservation.updateOne(
        { _id: reservation },
        {
          title,
          startDateTime,
          endDateTime,
          gym,
        }
      );
      return Reservation.findById(reservation);
    },
  },
};
