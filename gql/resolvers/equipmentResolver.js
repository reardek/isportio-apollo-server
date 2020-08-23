const Equipment = require("../../mongooseSchema/equipment");

module.exports = {
  Query: { equipments: () => Equipment.find({}) },
};
