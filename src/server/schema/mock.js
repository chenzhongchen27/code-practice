// Welcome to Launchpad!
// Log in to edit and save pads, and run queries in GraphiQL on the right.

const {
    graphql,
} = require('graphql');

const {
    makeExecutableSchema,
    addMockFunctionsToSchema,
} = require('graphql-tools');

const typeDefs = require('./typeDefs').default;

exports.schema = makeExecutableSchema({
    typeDefs,
});

const mocks = {
    // Here you could customize the mocks.
    // If you leave it empty, the default is used.
    // You can read more about mocking here: http://bit.ly/2pOYqXF
};

addMockFunctionsToSchema({
    schema,
});

const query = `
query author {
    author(id: 2) {
        id
        name
        posts(limit: 3) {
            title
        }
    }
}
`;

graphql(schema, query).then((result) => {
    console.log('Got result', result);
});
