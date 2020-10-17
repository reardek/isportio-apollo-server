const mongoose = require("mongoose");
const SportObjectOwner = require("../../mongooseSchema/sportObjectOwner");
const Company = require("../../mongooseSchema/company")

module.exports = {
  Query: { sportObjectOwners: () => SportObjectOwner.find({}) },
  Mutation: {
    addSportObjectOwner: async (parent, sportObjectOwner) => {
      const companyId = await Company.findOne({name: sportObjectOwner.company}, "_id");
      const newSportObjectOwner = new SportObjectOwner({
        _id: new mongoose.Types.ObjectId(),
        firstName: sportObjectOwner.firstName,
        lastName: sportObjectOwner.lastName,
        company: companyId,
      });
      return (await newSportObjectOwner.save()).populate("company").execPopulate();
    },
  },
};
