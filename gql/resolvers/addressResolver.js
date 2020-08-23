const Address = require("../../mongooseSchema/address");

module.exports = {
  Query: { addresses: () => Address.find({}) },
};
