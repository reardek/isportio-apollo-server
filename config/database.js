const mongoose = require("mongoose");
const loginCredential = require("./loginCredential");
const dotenv = require("dotenv").config();

const DB_URI = `mongodb+srv://${process.env.mongoLogin}:${process.env.mongoPassword}@isportio-oqbfe.mongodb.net/isportio?retryWrites=true&w=majority`;
console.log(process.env.mongoLogin)
mongoose.connect(DB_URI, { useNewUrlParser: true });
mongoose.connection.once("open", () =>
  console.log("Connected to iSportio Database instance")
);
mongoose.connection.on("error", (error) => console.error(error));
module.exports = mongoose;
