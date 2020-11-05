const mongoose = require("mongoose");
const SportObject = require("../../mongooseSchema/sportObject");
const SportObjectOwner = require("../../mongooseSchema/sportObjectOwner");
const Address = require("../../mongooseSchema/address");
const Country = require("../../mongooseSchema/country");
const Gym = require("../../mongooseSchema/gym");

module.exports = {
  Query: {
    sportObjects: async () => await SportObject.find({}),
    sportObjectByCityAndAvailability: async (parent, { city, availability }) =>
      SportObject.find({
        $and: [
          { "address.city": city },
          { "gyms.availability": { $gte: availability } },
        ],
      }),
    sportObjectById: async (parent, { sportObjectId }) =>
      SportObject.findById(sportObjectId),
  },
  SportObject: {
    sportObjectOwner: (parent) =>
      SportObjectOwner.findOne({ sportObject: parent._id }),
    address: (parent) => Address.findOne({ sportObject: parent._id }),
    gyms: (parent) => Gym.find({ sportObject: parent._id }),
    gymsFilter: (
      parent,
      { gymType, gymTags, minPrice, maxPrice, starRate }
    ) => {
      let query = [];
      if (gymType != undefined) query.push({ gymType: gymType });
      if (gymTags != undefined) query.push({ gymTags: { $in: gymTags } });
      if (minPrice != undefined && maxPrice != undefined)
        query.push({
          $and: [{ price: { $gte: minPrice } }, { price: { $lte: maxPrice } }],
        });
      if (starRate != undefined)
        query.push({
          $and: [
            { avgRate: { $gte: starRate - 0.5 } },
            { avgRate: { $lte: starRate + 0.5 } },
          ],
        });
      return Gym.find({ $and: query });
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
      const sportObjectAddress = new Address({
        _id: new mongoose.Types.ObjectId(),
        streetName: sportObject.address.streetName,
        buildingNumber: sportObject.address.buildingNumber,
        flatNumber: sportObject.address.flatNumber,
        city: sportObject.address.city,
        zipCode: sportObject.address.zipCode,
        country: countryID,
        geoPoint: sportObject.address.geoPoint,
      });
      sportObjectAddress.save((err) => {
        if (err) return err;
      });
      const newSportObject = new SportObject({
        _id: new mongoose.Types.ObjectId(),
        name: sportObject.name,
        address: sportObjectAddress._id,
        sportObjectOwner: sportObjectOwner,
        gyms: [],
        reviews: [],
      });
      return (await newSportObject.save())
        .populate({ path: "address", populate: { path: "country" } })
        .populate({ path: "sportObjectOwner" })
        .execPopulate();
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
