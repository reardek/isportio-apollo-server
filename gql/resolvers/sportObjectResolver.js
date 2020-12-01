const mongoose = require("mongoose");
const SportObject = require("../../mongooseSchema/sportObject");
const SportObjectOwner = require("../../mongooseSchema/sportObjectOwner");
const Address = require("../../mongooseSchema/address");
const Country = require("../../mongooseSchema/country");
const Gym = require("../../mongooseSchema/gym");

module.exports = {
  Query: {
    sportObjects: async () => await SportObject.find({}),
      
    sportObjectsByCity: async (parent, { city }) => {
      console.log(city);
      let sport = await SportObject.find({ "address.city": city });
      console.log(sport)
      return sport;
    },
    sportObjectById: async (parent, { sportObjectId }) =>
      SportObject.findById(sportObjectId),
  },
  SportObject: {
    sportObjectOwner: (parent) =>
      SportObjectOwner.findOne({ sportObject: parent._id }),

    gyms: (parent) => Gym.find({ sportObject: parent._id }),
    gymsFilter: async (
      parent,
      { gymType, gymTags, minPrice, maxPrice, starRate, availability, first, skip }
    ) => {
      let query = [];
      if (gymType) query.push({ gymType: gymType });
      if (gymTags) query.push({ gymTags: { $in: gymTags } });
      if (minPrice && maxPrice)
        query.push({
          $and: [{ price: { $gte: minPrice } }, { price: { $lte: maxPrice } }],
        });
      if (starRate)
        query.push({
          $and: [
            { avgRate: { $gte: starRate - 0.5 } },
            { avgRate: { $lte: starRate + 0.5 } },
          ],
        });
      if (availability) query.push({ availability: {$gte: availability} })
      let cursor = Gym.find({ $and: [...query, { sportObject: parent._id }] });
      if (first) cursor.limit(first);
      if (skip) cursor.skip(skip);
      return await cursor
    },
    gymById: (parent, { gymId }) => Gym.findById(gymId),
  },
  Mutation: {
    addSportObject: async (parent, sportObject) => {
      const [firstName, lastName] = await sportObject.SportObjectOwner.split(
        " "
      );
      const countryID = await Country.findOne(
        { code: sportObject.address.country },
        "_id"
      );
      const sportObjectOwner = await SportObjectOwner.findOne(
        { firstName, lastName },
        "_id"
      );
      const newSportObject = new SportObject({
        _id: new mongoose.Types.ObjectId(),
        name: sportObject.name,
        address: {
          streetName: sportObject.address.streetName,
          buildingNumber: sportObject.address.buildingNumber,
          flatNumber: sportObject.address.flatNumber,
          city: sportObject.address.city,
          zipCode: sportObject.address.zipCode,
          country: countryID,
          geoPoint: sportObject.address.geoPoint,
        },
        sportObjectOwner: sportObjectOwner,
        gyms: [],
        reviews: [],
      });
      return (await newSportObject.save())
        .populate({ path: "address", populate: { path: "country" } })
        .populate({ path: "sportObjectOwner" })
        .execPopulate();
    },
  },
};
