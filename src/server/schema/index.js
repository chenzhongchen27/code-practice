const resolvers = require('./resolvers');
const typeDefs = require('./typeDefs');
const {
    makeExecutableSchema, addMockFunctionsToSchema,
} = require('graphql-tools');

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

module.exports = schema;
