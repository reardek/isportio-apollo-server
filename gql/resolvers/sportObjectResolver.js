const SportObject = require("../../mongooseSchema/sportObject");

module.exports = {
  Query: { sportObjects: () => SportObject.find({}) },
  Mutation: {
    addSportObject: (parent, sportObject) => {
      const newSportObject = new SportObject({
        name: sportObject.name,
        address: sportObject.address,
        sportObjectOwnerId: sportObject.sportObjectOwnerId,
        gyms: [...sportObject.gyms],
      });
      return newSportObject.save();
    },
  },
};
