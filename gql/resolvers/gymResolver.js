const mongoose = require("mongoose");
const Gym = require("../../mongooseSchema/gym");
const GymType = require("../../mongooseSchema/gymType");
const GymTag = require("../../mongooseSchema/gymTag");
const SportObject = require("../../mongooseSchema/sportObject");

module.exports = {
  Query: {
    gyms: () =>
      Gym.find({})
        .populate("sportObject")
        .populate({ path: "equipments", populate: "equipment" })
        .populate({ path: "reviews", ref: "review", populate: {path: "user", ref: "user"}}),
    gymById: (parent, { gymId }) =>
      Gym.findById(gymId)
        .populate("sportObject")
        .populate({ path: "equipments", populate: "equipment" })
        .populate({ path: "reviews", ref: "review", populate: {path: "user", ref: "user"}}),
  },
  Gym: {
    gymType: (parent) => GymType.findOne({gyms: parent._id}),
    gymTags: (parent) => GymTag.find({gyms: parent._id}),
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
      });
      await SportObject.updateOne({ $push: { gyms: newGym._id } });
      return newGym.save();
    },
  },
};
