const mongoose = require("mongoose");
const Gym = require("../../mongooseSchema/gym");
const GymType = require("../../mongooseSchema/gymType");
const GymTag = require("../../mongooseSchema/gymTag");
const SportObject = require("../../mongooseSchema/sportObject");
const Equipment = require("../../mongooseSchema/equipment");
const Review = require("../../mongooseSchema/review");
const Reservation = require("../../mongooseSchema/reservation");
const Address = require("../../mongooseSchema/address");

module.exports = {
  Query: {
    gyms: () => Gym.find({}).populate("sportObject"),
    gymById: (parent, { gymId }) => Gym.findById(gymId).populate("sportObject"),
  },
  Gym: {
    gymType: (parent) => GymType.findOne({ gyms: parent._id }),
    gymTags: (parent) => GymTag.find({ gyms: parent._id }),
    equipments: (parent) => Equipment.find({ gyms: parent._id }),
    reviews: (parent) => Review.find({ gym: parent._id }),
    reservations: (parent) => Reservation.find({ gym: parent._id }),
    address: (parent) => Address.findOne({ gym: parent._id }),
  },
  Mutation: {
    addGym: async (parent, gym) => {
      const sportObjectAddress = await SportObject.findById(
        gym.sportObject,
        "address"
      );
      const newGym = new Gym({
        _id: new mongoose.Types.ObjectId(),
        sportObject: gym.sportObject,
        gymType: gym.gymType,
        name: gym.name,
        description: gym.description,
        phoneNumber: gym.phoneNumber,
        price: gym.price,
        avgRate: 0,
        mainPhoto: gym.mainPhoto,
        sidePhotos: gym.sidePhotos,
        maxAvailability: gym.availability,
        availability: gym.availability,
        address: sportObjectAddress,
        gymTags: [],
        equipments: [],
        reservations: [],
      });
      await SportObject.updateOne({ $push: { gyms: newGym._id } });
      await GymType.updateOne({ $push: { gyms: newGym._id } });
      await Address.updateOne({ $push: { gyms: newGym._id } });
      return newGym.save();
    },
  },
};
