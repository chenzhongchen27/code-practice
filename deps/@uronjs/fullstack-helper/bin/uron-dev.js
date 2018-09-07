#!/usr/bin/env node

const path = require('path');
const opn = require('opn');
const { devMiddleware, hotMiddleware } = require('koa-webpack-middleware');
const debug = require('debug')('uron:uron-dev');

/**
 * Parse Commands
 */
const program = require('commander');
program
    .version(require('../package').version, '-v, --version')
    .option('-o, --open-browser', 'Open browser when start server')
    .option('--web-host <webHost>', 'Web url when open browser')
    .option('-p, --port <port>', 'Web Server Port', parseInt)
    .option('-n, --only-node', 'Only launch server')
    .parse(process.argv);

/**
 * Execute Task
 */
process.env.NODE_ENV = 'development';

const uronConfig = global.uronConfig = require('../config/resolve')();
const vusionConfig = global.vusionConfig = require('vusion-cli/config/resolve')();

let port;
if (program.port) {
    port = uronConfig.port = program.port;
} else {
    port = uronConfig.port;
}

const url = `http://${program.webHost || 'localhost'}:${port}`;

const options = Object.assign({}, uronConfig);
const entryFile = path.resolve(process.cwd(), uronConfig.entry);
const app = require(entryFile)(options);
debug('onlyNode?', program.onlyNode);
if (!program.onlyNode)
    _webpackHotLoad(app);

app.listen(port, '0.0.0.0', (err) => {
    if (err)
        return console.error(err);

    if (program.openBrowser) {
        debug('openBrowser,url is: %s', url);
        opn(url);
    }

    console.info(`Server listen on ${port}`);
});
// 执行 webpack hot middleware and dev middleware
function _webpackHotLoad(app) {
    const { compiler, devOptions } = require('vusion-cli/lib/dev').prepare(require('vusion-cli/webpack/' + vusionConfig.type));
    app.use((ctx, next) => {
        if (ctx.url === '/') {
            ctx.url = '/public/index.html';
            return next();
        } else if (ctx.url.startsWith('/public')) {
            return next();
        } else if (ctx.url === '/__webpack_hmr') {
            return next();
        }
    });
    app.use(devMiddleware(compiler, devOptions));
    app.use(hotMiddleware(compiler));
}
