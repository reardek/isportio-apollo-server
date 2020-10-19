const mongoose = require("mongoose");
const GymTag = require("../../mongooseSchema/gymTag");
const Gym = require("../../mongooseSchema/gym");
const SportObject = require("../../mongooseSchema/sportObject")

module.exports = {
  Query: { gymTags: () => GymTag.find({}) },
  Mutation: {
    addGymTag: (parent, gymTag) => {
      const newGymTag = new GymTag({
        _id: new mongoose.Types.ObjectId(),
        name: gymTag.name,
        namePL: gymTag.namePL,
      });
      return newGymTag.save();
    },
    addGymTagToGym: async (parent, { sportObject, gym, gymTag }) => {
      const sportObjectId = await SportObject.findOne({name: sportObject}, "_id");
      const gymTagId = await GymTag.findOne({namePL: gymTag}, "_id");
      const updateGym = await Gym.findOneAndUpdate({sportObject: sportObjectId, name: gym}, {$push: {gymTags: gymTagId}});
      return updateGym;
    },
  },
};
