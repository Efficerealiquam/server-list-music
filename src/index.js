import { ApolloServer, gql } from "apollo-server";
import { makeExecutableSchema } from "@graphql-tools/schema";
import typeDefs from "./graphql/types";
import resolvers from "./graphql/resolvers";
require("dotenv").config();
require("./database");

/* const typeDefs = gql`
  type Query {
    sayHi: String!
  }
`;

const resolvers = {
  Query: {
    sayHi: () => "Hello",
  },
};
 */
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const server = new ApolloServer({
  schema,
  context: ({ req }) => ({ req }),
});

server
  .listen({ port: process.env.PORT || 4500 })
  .then((res) => {
    console.log("Server runing on port", res.port);
  })
  .catch((err) => console.log(err));
