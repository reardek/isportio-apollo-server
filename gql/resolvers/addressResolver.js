const Address = require("../../mongooseSchema/address");
const Country = require("../../mongooseSchema/country");
module.exports = {
  Query: { addresses: () => Address.find({}) },
  Address: {
    country: (parent) => Country.findOne({ addresses: parent._id }),
  },
  Mutation: {
    addAddress: async (parent, address) => {
      const countryID = await Country.findOne({ code: address.country }, "_id");
      const newAddress = new Address({
        streetName: address.streetName,
        buildingNumber: address.buildingNumber,
        flatNumber: address.flatNumber,
        city: address.city,
        zipCode: address.zipCode,
        country: countryID,
        geoPoint: [Number],
      });
    },
  },
};
