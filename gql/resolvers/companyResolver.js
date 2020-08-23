const Company = require("../../mongooseSchema/company");

module.exports = {
  Query: { companies: () => Company.find({}) },
  Mutation: {
    addCompany: (parent, company) => {
      const newCompany = new Company({
        name: company.name,
        companyCode: company.companyCode,
        address: company.address,
      });
      return newCompany.save();
    },
  },
};
