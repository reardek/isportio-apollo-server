const Gym = require("../../mongooseSchema/gym");

module.exports = {
  Query: { gyms: () => Gym.find({}) },
  Mutation: {
    addGym: (parent, gym) => {
      const newGym = new Gym({
        gymTypeId: gym.gymTypeId,
        description: gym.description,
        maxAvailability: gym.availability,
        availability: gym.availability,
        gymTags: [...gym.gymTags],
        equipments: [...gym.equipments],
      });
      return newGym.save();
    },
  },
};
