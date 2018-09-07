#!/usr/bin/env node

const path = require('path');
const debug = require('debug')('uron:uron-start');
const serve = require('koa-static');
const build = require('../lib/build');

/**
 * Parse Commands
 */
const program = require('commander');
program
    .version(require('../package').version, '-v, --version')
    .option('-B, --build', 'Build files in the beginning')
    .option('-p, --port <port>', 'Web Server Port', parseInt)
    .parse(process.argv);

/**
 * Execute Task
 */
const vusionConfig = global.vusionConfig = require('vusion-cli/config/resolve')();
const uronConfig = global.uronConfig = require('../config/resolve')();

let port;
if (program.port) {
    port = uronConfig.port = program.port;
} else {
    port = uronConfig.port;
}

let promise = Promise.resolve();
if (program.build) {
    promise = build();
}

promise.then(() => {
    const options = Object.assign({}, uronConfig);

    const entryFile = path.resolve(process.cwd(), uronConfig.entry);
    const app = require(entryFile)(options);
    _staticFile(app);

    app.listen(port,'0.0.0.0', (err) => {
        if (err)
            return console.error(err);

        console.info(`Server listen on ${port}`);
    });
});
function _staticFile(app) {
    const root = path.join(process.cwd(), './public');
    app.use((ctx, next) => {
        if (ctx.url === '/' || ctx.url === '/public' || ctx.url === '/public/') { // 首页
            ctx.url = '/index.html';
            return next();
        } else if (ctx.url.startsWith('/public')) { // public 下面的静态资源
            ctx.url = ctx.url.replace(/^\/public/, '');
            return next();
        }
    }).use(serve(root, {
        maxage: 1000 * 60 * 60 * 1,
    }));
}
