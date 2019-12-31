const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./schema");
const resolvers = require("./resolver");
const { createServer } = require("http");

const PORT = 3500;

const server = new ApolloServer({ typeDefs, resolvers });
const app = express();
// app.use("/graphql", (req, res) => {
//   res.send("Hello GraphQL");
// });
server.applyMiddleware({
  app,
  path: "/graphql"
});

const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT, () => {
  console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
});
