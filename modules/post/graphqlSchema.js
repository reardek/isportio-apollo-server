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
    _id: ID
    name: String
    quantity: Int
  }

  type Specialization {
    _id: ID
    name: String
    experience: String
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
  }

  input EquipmentInput {
    name: String
    quantity: Int
  }

  input SpecializationInput {
    name: String
    experience: String
  }
`;

module.exports = typeDefs;
