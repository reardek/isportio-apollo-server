const mongoose = require("mongoose");
const SportObject = require("../../mongooseSchema/sportObject");
const SportObjectOwner = require("../../mongooseSchema/sportObjectOwner");
const Address = require("../../mongooseSchema/address");
const Country = require("../../mongooseSchema/country");

module.exports = {
  Query: {
    sportObjects: () => {
      const sportObjects = SportObject.find({}).populate({
        path: "address",
        populate: {
          path: "country",
        },
      }).populate("sportObjectOwner");
      return sportObjects;
    },
    sportObjectByCityAndAvailability: async (parent, { city, availability }) =>
      SportObject.find({
        $and: [
          { "address.city": city },
          { "gyms.availability": { $gte: availability } },
        ],
      }).populate({
        path: "address",
        populate: {
          path: "country",
        },
      }),
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
