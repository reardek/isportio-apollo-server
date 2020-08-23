const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("./config/database");
const typeDefs = require("./gql/schemas");
const resolvers = require("./gql/resolvers");
const server = new ApolloServer({ typeDefs, resolvers, tracing: true });
const app = express();

server.applyMiddleware({ app });
app.listen({ port: 3001 }, () => {
  console.log(`Server running on http://localhost:3001${server.graphqlPath}`);
});
