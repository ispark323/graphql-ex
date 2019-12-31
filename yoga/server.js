const { GraphQLServer } = require("graphql-yoga");
var records = [];

const typeDefs = `
  type Query{
    fetchRecords: [String]
  }
  type Mutation{
    createRecord(recordData: String!): String!
    updateRecord(recordIndex: Int!, recordName: String!): String!
  }
`;

const resolvers = {
  Query: {
    fetchRecords: () => records
  },
  Mutation: {
    createRecord: (obj, { recordData }) => {
      records.push(recordData);
      return `New record created: ${recordData}`;
    },
    updateRecord: (obj, { recordIndex, recordName }) => {
      if (records[+recordIndex] === undefined) {
        throw new Error("Record index does not exist!");
      }

      records[+recordIndex] = recordName;
      return `Record updated to: ${recordName}`;
    }
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => {
  console.log("Server is running on localhost:4000");
});
