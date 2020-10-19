const mongoose = require("mongoose");
const GymType = require("../../mongooseSchema/gymType");

module.exports = {
  Query: { gymTypes: () => GymType.find({}) },
  Mutation: {
    addGymType: (parent, gymType) => {
      const newGymType = new GymType({
        _id: new mongoose.Types.ObjectId(),
        name: gymType.name,
        namePL: gymType.namePL
      });
      return newGymType.save();
    },
  },
};
