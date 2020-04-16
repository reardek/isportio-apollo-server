const { gql } = require("apollo-server-express");

const typeDefs = gql`
  scalar Date

  type User {
    _id: ID
    loginEmail: String
    password: String
    firstName: String
    lastName: String
    birthDate: Date
    registeredDate: Date
  }

  type Reservation {
    _id: ID
    startDateTime: Date
    endDateTime: Date
    createdAt: Date
    userId: ID
    gymId: ID
  }

  type Gym {
    _id: ID
    gymTypeId: ID
    description: String
    ReservationId: ID
    equipments: [Equipment]
  }

  type Trainer {
    _id: ID
    firstName: String
    lastName: String
    specializations: [Specialization]
  }

  type Equipment {
    name: String
    quantity: Int
  }

  type Specialization {
    name: String
    experience: String
  }

  type SportObject {
    _id: ID
    name: String
    address: Address
    SportObjectOwnerId: ID
  }

  type SportObjectOwner {
    _id: ID
    firstName: String
    lastName: String
    companyId: ID
  }

  type Company {
    _id: ID
    name: String
    companyCode: String
    address: Address
  }

  type Review {
    _id: ID
    desciption: String
    starRate: Float
    sportObjectId: ID
  }

  type Address {
    streetName: String
    buildingNumber: Int
    flatNumber: Int
    zipCode: String
    country: String
  }

  type Query {
    users: [User]
    userById(userId: String!): User
    reservations: [Reservation]
    userReservations(userId: ID!): [Reservation]
    gyms: [Gym]
    equipments: [Equipment]
    trainers: [Trainer]
    specializations: [Specialization]
    sportObjects: [SportObject]
    addresses: [Address]
    sportObjectOwners: [SportObjectOwner]
    companies: [Company]
    reviews: [Review]
  }

  type Mutation {
    addUser(
      loginEmail: String!
      password: String!
      firstName: String!
      lastName: String!
      birthDate: Date!
    ): User

    addReservation(
      startDateTime: Date!
      endDateTime: Date!
      userId: ID!
      gymId: ID!
    ): Reservation

    addGym(
      desciption: String
      reservationId: ID
      equipments: [EquipmentInput!]
    ): Gym

    addTrainer(
      firstName: String
      lastName: String
      specializations: [SpecializationInput!]
    ): Trainer

    addSportObject(
      name: String
      address: AddressInput
      SportObjectOwnerId: ID
    ): SportObject

    addSportObjectOwner(
      firstName: String
      lastName: String
      companyId: ID
    ): SportObjectOwner

    addCompany(
      name: String
      companyCode: String
      address: AddressInput
    ): Company

    addReview(
      desciption: String
      starRate: Float
      sportObjectId: ID
    ) : Review
  }

  input EquipmentInput {
    name: String
    quantity: Int
  }

  input SpecializationInput {
    name: String
    experience: String
  }

  input AddressInput {
    streetName: String
    buildingNumber: Int
    flatNumber: Int
    zipCode: String
    country: String
  }
`;

module.exports = typeDefs;
