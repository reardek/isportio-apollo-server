const Trainer = require("../../mongooseSchema/trainer");

module.exports = {
  Query: { trainers: () => Trainer.find({}) },
  Mutation: {
    addTrainer: (parent, trainer) => {
      const newTrainer = new Trainer({
        firstName: trainer.firstName,
        lastName: trainer.lastName,
        specializations: [...trainer.specialization],
      });
      return newTrainer.save();
    },
  },
};
