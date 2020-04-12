const User = require("./models/user");
const Reservation = require("./models/reservation");

const resolvers = {
  Query: {
    users: () => User.find({}),
    userById: (parent, args) => User.findById({ _id: args.userId }),
    reservations: () => Reservation.find({}),
    userReservations: (parent, { userId }) => Reservation.find({userId: userId}),
  },

  Mutation: {
    addUser: (parent, user) => {
      const newUser = new User({
        login: user.login,
        password: user.password,
        name: user.name,
        surname: user.surname,
        age: user.age,
      });
      return newUser.save();
    },
    addReservation: (parent, reservation) => {
      const newReservation = new Reservation({
        name: reservation.name,
        userId: reservation.userId,
      });
      return newReservation.save();
    },
  },
};

module.exports = resolvers;
