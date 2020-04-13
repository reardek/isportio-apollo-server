const User = require("./models/user");
const Reservation = require("./models/reservation");
const Gym = require("./models/gym");
const Equipment = require("./models/equipment");

const resolvers = {
  Query: {
    users: () => User.find({}),
    userById: (parent, args) => User.findById({ _id: args.userId }),
    reservations: () => Reservation.find({}),
    userReservations: (parent, args) =>
      Reservation.find({ userId: args.userId }),
    gyms: () => Gym.find({}),
    equipments: () => Equipment.find({}),
  },

  Mutation: {
    addUser: (parent, user) => {
      const newUser = new User({
        loginEmail: user.login,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        birthDate: user.birthDate,
      });
      return newUser.save();
    },
    addReservation: (parent, reservation) => {
      const newReservation = new Reservation({
        startDateTime: reservation.startDateTime,
        endDateTime: reservation.endDateTime,
        userId: reservation.userId,
        gymId: reservation.gymId,
      });
      return newReservation.save();
    },
    addGym: (parent, gym) => {
      const newGym = new Gym({
        gymTypeId: gym.gymTypeId,
        description: gym.description,
        reservationId: gym.reservationId,
        equipments: [...gym.equipments],
      });
      return newGym.save();
    },
  },
};

module.exports = resolvers;
