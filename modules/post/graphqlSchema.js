const { gql } = require("apollo-server-express");

const typeDefs = gql`
  scalar Date

  type User {
    _id: ID
    login: String
    password: String
    name: String
    surname: String
    age: Int
    createdAt: Date
  }

  type Reservation {
    _id: ID
    name: String
    userId: ID
  }

  type Query {
    users: [User]
    userById(userId: String!): User
    reservations: [Reservation]
    userReservations(userId: String!): [Reservation] 
  }

  type Mutation {
    addUser(
      login: String!
      password: String!
      name: String!
      surname: String
      age: Int
    ): User

    addReservation(name: String!, userId: ID!): Reservation
  }
`;

module.exports = typeDefs;
