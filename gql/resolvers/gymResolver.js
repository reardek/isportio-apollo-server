const mongoose = require("mongoose");
const Gym = require("../../mongooseSchema/gym");
const GymType = require("../../mongooseSchema/gymType");
const GymTag = require("../../mongooseSchema/gymTag");
const SportObject = require("../../mongooseSchema/sportObject");
const Equipment = require("../../mongooseSchema/equipment");
const Review = require("../../mongooseSchema/review");
const Reservation = require("../../mongooseSchema/reservation")

module.exports = {
  Query: {
    gyms: () =>
      Gym.find({})
        .populate("sportObject"),
    gymById: (parent, { gymId }) =>
      Gym.findById(gymId)
        .populate("sportObject")
  },
  Gym: {
    gymType: (parent) => GymType.findOne({gyms: parent._id}),
    gymTags: (parent) => GymTag.find({gyms: parent._id}),
    equipments: (parent) => Equipment.find({gyms: parent._id}),
    reviews: (parent) => Review.find({gym: parent._id}),
    reservations: (parent) => Reservation.find({gym: parent._id})
  },
  Mutation: {
    addGym: async (parent, gym) => {
      const gymTypeId = await GymType.findOne({ namePL: gym.gymType }, "_id");
      const sportObjectId = await SportObject.findOne(
        { name: gym.sportObject },
        "_id"
      );
      const newGym = new Gym({
        _id: new mongoose.Types.ObjectId(),
        sportObject: sportObjectId,
        gymType: gymTypeId,
        name: gym.name,
        description: gym.description,
        phoneNumber: gym.phoneNumber,
        price: gym.price,
        mainPhoto: gym.mainPhoto,
        sidePhotos: gym.sidePhotos,
        maxAvailability: gym.availability,
        availability: gym.availability,
        gymTags: [],
        equipments: [],
        reservations: []
      });
      await SportObject.updateOne({ $push: { gyms: newGym._id } });
      return newGym.save();
    },
  },
};
