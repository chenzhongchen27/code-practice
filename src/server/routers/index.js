const router = require('koa-router')();
const { graphqlKoa, graphiqlKoa } = require('apollo-server-koa');
const schema = require('../schema');
const graphqlController = require('@controller/graphql');
const home = require('./home');
const api = require('./api');

router.use('/v1/api', api.routes());
router.use('', home.routes());
// graphql
router.post('/graphql', graphqlController.patchFilesToBody, graphqlKoa({ schema }));
router.get('/graphql', graphqlKoa({ schema }));
router.get(
    '/graphiql',
    graphiqlKoa({
        endpointURL: '/graphql', // a POST endpoint that GraphiQL will make the actual requests to
    })
);
module.exports = router;
