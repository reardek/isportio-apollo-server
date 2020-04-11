const { Schema, model } = require("mongoose");

const reservationSchema = Schema({
    name: String,
    userId: String
})