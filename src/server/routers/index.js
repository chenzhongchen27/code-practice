const router = require('koa-router')();
const { graphqlKoa, graphiqlKoa } = require('apollo-server-koa');
const schema = require('../schema');
const graphqlController = require('@controller/graphql');
const home = require('./home');
const api = require('./api');

router.get('/house.js', (ctx, next) => {
    const data = [
        { address: '12-3-4', area: 50 },
        { address: '12-3-4', area: 70 },
        { address: '12-3-5', area: 90 },
        { address: '12-3-4', area: 5 },
    ];
    ctx.body = `fn(${JSON.stringify(data)})`;
});

router.get('/house1.js', (ctx, next) => {
    const callabckName = ctx.query.callback;
    const data = [
        { address: '12-3-4', area: 50 },
        { address: '12-3-4', area: 70 },
        { address: '12-3-5', area: 90 },
        { address: '12-3-4', area: 5 },
    ];
    ctx.body = `${callabckName}(${JSON.stringify(data)})`;
});

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
