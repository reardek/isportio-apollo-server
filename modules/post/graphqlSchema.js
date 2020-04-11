const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Post {
    _id: ID
    title: String
    content: String
  }

  type User {
    _id: ID
    name: String
    password: String
    age: Int
  }

  type Query {
    posts: [Post]
    users: [User]
  }

  type Mutation {
    addPost(title: String!, content: String!): Post
    addUser(name: String!, password: String!, age: Int): User
  }
`;

module.exports = typeDefs;
