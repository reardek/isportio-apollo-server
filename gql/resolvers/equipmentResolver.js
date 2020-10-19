const mongoose = require("mongoose");
const Equipment = require("../../mongooseSchema/equipment");
const SportObject = require("../../mongooseSchema/sportObject");
const Gym = require("../../mongooseSchema/gym");

module.exports = {
  Query: { equipments: () => Equipment.find({}) },
  Mutation: {
    addEquipment: async (parent, equipment) => {
      const newEquipment = new Equipment({
        _id: new mongoose.Types.ObjectId(),
        name: equipment.name,
        namePL: equipment.namePL,
      });
      return await newEquipment.save();
    },
    addEquipmentToGym: async(parent, {sportObject, gym, equipment}) => {
      const sportObjectId = await SportObject.findOne({name: sportObject}, "_id");
      const equipmentId = await Equipment.findOne({namePL: equipment}, "_id");
      const updateEquipment = await Gym.findOneAndUpdate({sportObject: sportObjectId, name: gym}, {$push: {equipments: equipmentId}});
      return updateEquipment;
    }
  }
};
