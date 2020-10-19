const mongoose = require("mongoose");
const Gym = require("../../mongooseSchema/gym");
const GymType = require("../../mongooseSchema/gymType");
const SportObject = require("../../mongooseSchema/sportObject");

module.exports = {
  Query: {
    gyms: () =>
      Gym.find({})
        .populate("gymType")
        .populate("sportObject")
        .populate({ path: "gymTags", populate: "gymTag" })
        .populate({ path: "equipments", populate: "equipment" }),
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
        maxAvailability: gym.availability,
        availability: gym.availability,
        gymTags: [],
        equipments: [],
      });
      await SportObject.updateOne({$push: {gyms: newGym._id}});
      return newGym.save();
    },
  },
};
