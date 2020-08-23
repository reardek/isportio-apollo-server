const SportObjectOwner = require("../../mongooseSchema/sportObjectOwner");

module.exports = {
  Query: { sportObjectOwners: () => SportObjectOwner.find({}) },
  Mutation: {
    addSportObjectOwner: (parent, sportObjectOwner) => {
      const newSportObjectOwner = new SportObjectOwner({
        firstName: sportObjectOwner.firstName,
        lastName: sportObjectOwner.lastName,
        companyId: sportObjectOwner.companyId,
      });
      return newSportObjectOwner.save();
    },
  },
};
