const Address = require("../../mongooseSchema/address");

module.exports = {
  Query: { addresses: () => Address.find({}).populate("country") },
  Mutation: {
    addAddress: (parent, address) => {
      const newAddress = new Address({
        streetName: address.streetName,
        buildingNumber: address.buildingNumber,
        flatNumber: address.flatNumber,
        city: address.city,
        zipCode: address.zipCode,
        country: [{ type: ObjectId, ref: "country" }],
        geoPoint: [Number],
      });
    },
  },
};
