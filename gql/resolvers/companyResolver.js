const mongoose = require("mongoose");
const Company = require("../../mongooseSchema/company");
const Address = require("../../mongooseSchema/address");
const Country = require("../../mongooseSchema/country");

module.exports = {
  Query: { companies: () => Company.find({}).populate("address") },
  Mutation: {
    addCompany: async (parent, company) => {
      const countryID = await Country.findOne(
        { code: company.address.country },
        "_id"
      );
      const companyAddress = new Address({
        _id: new mongoose.Types.ObjectId(),
        streetName: company.address.streetName,
        buildingNumber: company.address.buildingNumber,
        flatNumber: company.address.flatNumber,
        city: company.address.city,
        zipCode: company.address.zipCode,
        country: countryID,
        geoPoint: company.address.geoPoint,
      });
      companyAddress.save((err) => {
        return err;
      });
      const newCompany = new Company({
        _id: new mongoose.Types.ObjectId(),
        name: company.name,
        companyCode: company.companyCode,
        address: companyAddress._id,
      });
      return (await newCompany.save())
        .populate({
          path: "address",
          populate: {
            path: "country",
          },
        })
        .execPopulate();
    },
  },
};
