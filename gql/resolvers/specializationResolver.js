const Specialization = require("../../mongooseSchema/specialization");

module.exports = {
    Query: {specializations: () => Specialization.find({})},
}