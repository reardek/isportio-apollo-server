const GymTag = require("../../mongooseSchema/gymTag");

module.exports = {
  Query: { gymTags: () => GymTag.find({}) },
  Mutation: {
    addGymTag: (parent, gymTag) => {
      const newGymTag = new GymTag({
        name: gymTag.name,
      });
      return newGymTag.save();
    },
  },
};
