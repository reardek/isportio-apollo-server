const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    login: String
    password: String
    name: String
    surname: String
    age: Int
  }

  type Reservation {
    _id: ID
    name: String
    userId: ID
  }

  type Query {
    userById(userId: String!): User
    reservations: [Reservation]
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
