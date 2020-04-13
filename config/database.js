const mongoose = require("mongoose");
const loginCredential = require("./loginCredential");
const DB_URI = `mongodb+srv://${loginCredential.login}:${loginCredential.password}@isportio-oqbfe.mongodb.net/isportio?retryWrites=true&w=majority`;

mongoose.connect(DB_URI, { useNewUrlParser: true });
mongoose.connection.once("open", () =>
  console.log("Connected to iSportio Database instance")
);
mongoose.connection.on("error", (error) => console.error(error));
module.exports = mongoose;
