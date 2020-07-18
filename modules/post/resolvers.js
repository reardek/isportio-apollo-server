const User = require("./models/user");
const Reservation = require("./models/reservation");
const Gym = require("./models/gym");
const Equipment = require("./models/equipment");
const Trainer = require("./models/trainer");
const Specialization = require("./models/specialization");
const SportObject = require("./models/sportObject");
const Address = require("./models/address");
const Country = require("./models/country");
const SportObjectOwner = require("./models/sportObjectOwner");
const Company = require("./models/company");
const Review = require("./models/review");
const Cities = require("./models/cities");

const resolvers = {
  Query: {
    users: () => User.find({}),
    userById: (parent, args) => User.findById({ _id: args.userId }),
    reservations: () => Reservation.find({}),
    userReservations: (parent, args) =>
      Reservation.find({ userId: args.userId }),
    gyms: () => Gym.find({}),
    equipments: () => Equipment.find({}),
    trainers: () => Trainer.find({}),
    specializations: () => Specialization.find({}),
    sportObjects: () => SportObject.find({}),
    sportObjectOwners: () => SportObjectOwner.find({}),
    addresses: () => Address.find({}),
    countries: () => Country.find({}),
    companies: () => Company.find({}),
    reviews: () => Review.find({}),
    cities: () => Cities.find({}),
  },

  Mutation: {
    addUser: (parent, user) => {
      const newUser = new User({
        loginEmail: user.loginEmail,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        birthDate: user.birthDate,
      });
      return newUser.save();
    },
    addReservation: (parent, reservation) => {
      const newReservation = new Reservation({
        startDateTime: reservation.startDateTime,
        endDateTime: reservation.endDateTime,
        userId: reservation.userId,
        gymId: reservation.gymId,
      });
      return newReservation.save();
    },
    addGym: (parent, gym) => {
      const newGym = new Gym({
        gymTypeId: gym.gymTypeId,
        description: gym.description,
        reservationId: gym.reservationId,
        equipments: [...gym.equipments],
      });
      return newGym.save();
    },
    addTrainer: (parent, trainer) => {
      const newTrainer = new Trainer({
        firstName: trainer.firstName,
        lastName: trainer.lastName,
        specializations: [...trainer.specialization],
      });
      return newTrainer.save();
    },
    addSportObject: (parent, sportObject) => {
      const newSportObject = new SportObject({
        name: sportObject.name,
        address: sportObject.address,
        sportObjectOwnerId: sportObject.sportObjectOwnerId,
      });
      return newSportObject.save();
    },
    addSportObjectOwner: (parent, sportObjectOwner) => {
      const newSportObjectOwner = new SportObjectOwner({
        firstName: sportObjectOwner.firstName,
        lastName: sportObjectOwner.lastName,
        companyId: sportObjectOwner.companyId,
      });
      return newSportObjectOwner.save();
    },
    addCompany: (parent, company) => {
      const newCompany = new Company({
        name: company.name,
        companyCode: company.companyCode,
        address: company.address,
      });
      return newCompany.save();
    },
    addReview: (parent, review) => {
      const newReview = new Review({
        description: review.description,
        starRate: review.starRate,
        sportObjectId: review.sportObjectId,
      });
      return newReview.save();
    },
  },
};

module.exports = resolvers;
