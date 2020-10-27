const mongoose = require("mongoose");
const SportObject = require("../../mongooseSchema/sportObject");
const SportObjectOwner = require("../../mongooseSchema/sportObjectOwner");
const Address = require("../../mongooseSchema/address");
const Country = require("../../mongooseSchema/country");

module.exports = {
  Query: {
    sportObjects: async () =>
      await SportObject.find({})
        .populate({
          path: "address",
          populate: {
            path: "country",
          },
        })
        .populate("sportObjectOwner")
        .populate({
          path: "gyms",
          populate: [
            { path: "equipments", ref: "equipment" },
            { path: "gymType", ref: "gymType" },
            { path: "gymTags", ref: "gymTag" },
          ],
        }),
    sportObjectByCityAndAvailability: async (parent, { city, availability }) =>
      SportObject.find({
        $and: [
          { "address.city": city },
          { "gyms.availability": { $gte: availability } },
        ],
      })
        .populate({
          path: "address",
          populate: {
            path: "country",
          },
        })
        .populate({
          path: "gyms",
          ref: "gym",
          populate: [
            { path: "gymTags", populate: "gymTag" },
            { path: "equipments", populate: "equipment" },
            { path: "reviews", populate: "review" },
            { path: "gymType", populate: "gymType" },
          ],
        }),
    sportObjectById: async (parent, { sportObjectId }) =>
      SportObject.findById(sportObjectId)
        .populate({
          path: "address",
          populate: {
            path: "country",
          },
        })
        .populate({
          path: "gyms",
          ref: "gym",
          populate: [
            { path: "gymTags", populate: "gymTag" },
            { path: "equipments", populate: "equipment" },
            { path: "reviews", populate: "review" },
            { path: "gymType", populate: "gymType" },
          ],
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
