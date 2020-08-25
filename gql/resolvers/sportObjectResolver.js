const SportObject = require("../../mongooseSchema/sportObject");

module.exports = {
  Query: {
    sportObjects: () => SportObject.find({}),
  },
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
    addGymToSportObject: (parent, { sportObjectId, gym }) => {
      const uSportObject = SportObject.findByIdAndUpdate(
        sportObjectId,
        { $push: { gyms: gym } },
        (err, res) => {
          res.save();
        }
      );
      return uSportObject;
    },
  },
};
