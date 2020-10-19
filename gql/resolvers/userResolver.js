const User = require("../../mongooseSchema/user");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");

module.exports = {
  Query: {
    users: () => User.find({}),
    userById: (parent, args) => User.findById({ _id: args.userId }),
    userByEmail: (parent, {loginEmail}) => User.findOne({"loginEmail": loginEmail})
  },
  Mutation: {
    addUser: async (parent, user) => {
      const pass = await bcrypt.hash(user.password, 10);
      const newUser = new User({
        loginEmail: user.loginEmail,
        password: pass,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        birthDate: user.birthDate,
        reviews: []
      });
      return newUser.save();
    },
    loginUser: async (parent, { loginEmail, password }) => {
      const findUser = await User.findOne(
        { loginEmail: loginEmail },
        "loginEmail password role"
      );

      const validate = await bcrypt.compare(password, findUser.password);
      if (validate) {
        const pathToKey = path.join(__dirname, "..", "..", "private.key");
        const key = fs.readFileSync(pathToKey, "utf-8");
        const jsonToken = jwt.sign(
          {
            loginEmail: findUser.loginEmail,
            role: findUser.role,
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
          },
          key,
          { algorithm: "RS256" }
        );
        return jsonToken;
      }
    },
    verifyUser: (parent, { token }) => {
      const pathToKey = path.join(__dirname, "..", "..", "public.pem");
      const key = fs.readFileSync(pathToKey, "utf-8");
      const jsonToken = jwt.verify(token, key, { algorithm: "RS256" }, (err, res) => {
        if (err) return err
        else return res
      });
      return jsonToken;
    },
    isLoginUserExists: async (parent, {loginEmail}) => {
      const isUserExists = await User.findOne({"loginEmail": loginEmail})
      if (isUserExists) return true
      else return false
    }
  },
};
