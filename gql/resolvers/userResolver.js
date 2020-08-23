const User = require("../../mongooseSchema/user");

module.exports = {
  Query: {
    users: () => User.find({}),
    userById: (parent, args) => User.findById({ _id: args.userId }),
  },
  Mutation: {
    addUser: (parent, user) => {
      const newUser = new User({
        loginEmail: user.loginEmail,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        birthDate: user.birthDate,
      });
      return newUser.save();
    },
  },
};
