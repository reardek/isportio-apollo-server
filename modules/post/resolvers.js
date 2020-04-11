const User = require("./models/user");
const Reservation = require("./models/reservation");

const resolvers = {
  Query: {
    userById: (parent, { userId }) => User.findById({ _id: userId }),
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
    },
  },
};

module.exports = resolvers;
