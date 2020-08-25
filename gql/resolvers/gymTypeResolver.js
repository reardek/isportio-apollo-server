const GymType = require("../../mongooseSchema/gymType");

module.exports = {
  Query: { gymTypes: () => GymType.find({}) },
  Mutation: {
    addGymType: (parent, gymType) => {
      const newGymType = new GymType({
        name: gymType.name,
      });
      return newGymType.save();
    },
  },
};
