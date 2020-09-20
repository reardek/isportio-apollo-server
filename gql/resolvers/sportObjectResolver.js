const SportObject = require("../../mongooseSchema/sportObject");

module.exports = {
  Query: {
    sportObjects: () =>
      SportObject.find({}).populate({
        path: "address",
        populate: {
          path: "country",
        },
      }),
    sportObjectByCityAndAvailability: async (parent, { city, availability }) =>
      SportObject.find({
        $and: [
          { "address.city": city },
          { "gyms.availability": { $gte: availability } },
        ],
      }),
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
