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

  type Equipment {
    _id: ID
    name: String
    quantity: Int
  }

  type Query {
    users: [User]
    userById(userId: String!): User
    reservations: [Reservation]
    userReservations(userId: ID!): [Reservation]
    gyms: [Gym]
    equipments: [Equipment]
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
  }

  input EquipmentInput {
    name: String
    quantity: Int
  }
`;

module.exports = typeDefs;
