/*
 * @Author: xuefei
 * @Date: 2018-07-10 09:57:45
 * @Last Modified by: xuefei
 * @Last Modified time: 2018-07-11 14:48:27
 */

// 将.env中配置到环境变量
require('../config');

// middleware文件夹
const handleCustomCode = require('@s-middles/handleCustomCode');
const cache = require('./plugin/cache');
const bunyanLogger = require('@uronjs/bunyan-logger');
const auth = require('./middleware/auth');
// 项目内部其他
const log = require('@s-utils/logger').createLogger('app');
const routers = require('./routers/index');
// 公共包
const Koa = require('koa');
const config = require('config');
const koaBody = require('koa-better-body');
const session = require('koa-session');
const convert = require('koa-convert');

const LRU = require('lru-cache');
const sessionCache = new LRU({
    max: 100,
    maxAge: 1000 * 60 * 60 * 6,
});

const store = {
    get(key) {
        return sessionCache.get(key);
    },

    set(key, value) {
        return sessionCache.set(key, value);
    },

    destroy(key) {
        return sessionCache.del(key);
    },
};

module.exports = (options) => {
    // 兼容koa1的中间件写法
    const app = new Koa();

    const _use = app.use;
    app.use = (x) => _use.call(app, convert(x));


    app.keys = config.keys;

    app.on('error', (error, ctx) => {
        if (!ctx) {
            console.error('触发了koa error 事件 [无ctx] message: %s error', error.message);
        } else {
            const otherInfo = `ctx.reqId: ${ctx.reqId} originalUrl: ${ctx.originalUrl}`;
            error.message += `otherInfo: ${otherInfo}`;
            console.error('触发了koa error 事件 message: %s ', error.message);
        }
    });

    // 日志
    app.use(bunyanLogger({
        name: 'uron',
    }));
    app.use(bunyanLogger.requestIdContext());
    app.use(bunyanLogger.requestLogger());
    cache(app);
    app.use(session({
        key: config.sessionKey,

        store,
        maxAge: 8 * 60 * 60 * 1000,
    }, app));
    app.use(koaBody({
        multipart: false,
    }));
    app.use(bunyanLogger.printKoaBetterBody());
    handleCustomCode(app);
    // 业务逻辑
    app.use(auth());

    // 定义code方法
    app.use(routers.routes()).use(routers.allowedMethods());
    return app;
};
