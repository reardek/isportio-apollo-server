const User = require("../../mongooseSchema/user");
const bcrypt = require("bcrypt");

module.exports = {
  Query: {
    users: () => User.find({}),
    userById: (parent, args) => User.findById({ _id: args.userId }),
  },
  Mutation: {
    addUser: async (parent, user) => {
      let pass = await bcrypt.hashSync(user.password, 10, (err, hash) => {
        if (err) console.log(err);
        return hash;
      });
      const newUser = new User({
        loginEmail: user.loginEmail,
        password: pass,
        firstName: user.firstName,
        lastName: user.lastName,
        birthDate: user.birthDate,
      });
      return newUser.save();
    },
  },
};
