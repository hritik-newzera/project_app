const { ApolloServer, gql } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const express = require("express");
const http = require("http");
const mysql = require("mysql");
const util = require("util");

const db_config = {
  host: "remotemysql.com",
  user: "oSnkbkcv9S",
  password: "QCyV3UWO3i",
  database: "oSnkbkcv9S",
};

let userData = {
  ID: 1,
  Name: "Hritik Agarwal",
  Designation: "Software Developer",
  Website: "@Newzera.com",
  Photo: "",
};

var connection;
const makeConnection = () => {
  connection = mysql.createConnection(db_config);
  connection.on("error", (error) => {
    console.log("This is the error!")
    if(error.code === 'PROTOCOL_CONNECTION_LOST'){
      makeConnection();
    }
    console.log(error);
  })
}
makeConnection();

// node native promisify
const query = util.promisify(connection.query).bind(connection);

const typeDefs = gql`
  type User {
    ID: Int!
    Name: String!
    Designation: String!
    Website: String!
    Photo: String!
  }
  type Query {
    getUserDetails: User!
  }
  type Mutation {
    addProfilePicture(photoData: String!): User!
  }
`;

const resolvers = {
  Query: {
    getUserDetails: async () => {
      try {
        const result = await query("SELECT * FROM `User Data`");
        result[0].Photo = result[0].Photo.toString("utf8");
        return result[0];
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    addProfilePicture: async (parent, args) => {
      try {
        const queryString =
          "UPDATE  `User Data` SET Photo = '" +
          args.photoData +
          "' WHERE ID = 1";
        await query(queryString);
        userData.Photo = args.photoData;
        return userData;
      } catch (error) {
        console.log(error);
      }
    },
  },
};

async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  server.applyMiddleware({ app });
  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer(typeDefs, resolvers);
