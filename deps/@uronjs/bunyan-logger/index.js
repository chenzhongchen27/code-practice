'use strict';

const bunyan = require('bunyan');
const uuid = require('uuid');
const util = require('util');
const onFinished = require('on-finished');
const ringbuffer = new bunyan.RingBuffer({ limit: 10 });
const _ = require('lodash');
const debug = require('debug')('koa2-better-bunyan-logger');

/*
 * If logger is a bunyan logger instance, return it;
 * otherwise, create a new logger with some reasonable defaults.
 */
function createOrUseLogger(logger) {
    if (!logger || !logger.info || !logger.child) {
        const loggerOpts = logger || {};
        loggerOpts.name = loggerOpts.name || 'koa';
        loggerOpts.serializers = loggerOpts.serializers || bunyan.stdSerializers;
        loggerOpts.streams = [
            {
                level: 'info',
                stream: process.stdout,
            },
            {
                level: 'trace',
                type: 'raw', // use 'raw' to get raw log record objects
                stream: ringbuffer,
            },
        ];
        logger = bunyan.createLogger(loggerOpts);
    }

    return logger;
}

/*
 * Koa middleware that adds this.log property to the koa context
 * containing a bunyan logger instance.
 *
 * Parameters:
 *  - loggerInstance: bunyan logger instance, or an object with properties
 *                    that will be passed to bunyan.createLogger. If not
 *                    specified, a default logger will be used.
 */
module.exports = function (loggerInstance) {
    loggerInstance = createOrUseLogger(loggerInstance);

    return function logger(ctx, next) {
        ctx.log = loggerInstance;
        return next();
    };
};

/*
 * Koa middleware that gets a unique request id from a header or
 * generates a new one, and adds the requestId to all messages logged
 * using this.log in downstream middleware and handlers.
 *
 * Must use(koaBunyanLogger()) before using this middleware.
 *
 * Parameters:
 *  - opts: object with optional properties:
 *    - header: name of header to get request id from (default X-Request-Id)
 *    - prop: property to store on 'this' context (default 'reqId')
 *    - requestProp: property to store on 'this.request' (default 'reqId')
 *    - field: log field name for bunyan (default 'req_id')
 */
module.exports.requestIdContext = function (opts) {
    opts = opts || {};

    const header = opts.header || 'X-Request-Id';
    const ctxProp = opts.prop || 'reqId';
    const requestProp = opts.requestProp || 'reqId';
    const logField = opts.field || 'req_id';

    return function requestIdContext(ctx, next) {
        const reqId = ctx.request.get(header) || uuid.v4();

        ctx[ctxProp] = reqId;
        ctx.request[requestProp] = reqId;
        ctx.set('X-Reponse-Id', reqId);

        const logFields = {};
        logFields[logField] = reqId;

        if (!ctx.log)
            throw new Error('must use(koaBunyanLogger()) before ctx middleware');

        ctx.log = ctx.log.child(logFields);

        return next();
    };
};

module.exports.printKoaBetterBody = function printKoaBetterBody({ body = false, fields = true, files = false } = {}) {
    return function _printKoaBetterBody(ctx, next) {
        if (!ctx.log)
            throw new Error('must use(koaBunyanLogger()) before ctx middleware');
        if (fields)
            ctx.log.info('[ ctx.fields ]  %O', ctx.request.fields);
        if (files)
            ctx.log.info('[ ctx.files ]  %O', ctx.request.files);
        if (body)
            ctx.log.info('[ ctx.body ]  %O', ctx.request.body);

        return next();
    };
};

/*
 * Logs requests and responses.
 *
 * Must use(koaBunyanLogger()) before using this middleware.
 *
 * Parameters:
 *  - opts: object with optional properties
 *    - durationField: name of duration field
 *    - levelFn: function (status, err)
 *    - updateLogFields: function (data)
 *    - updateRequestLogFields: function (requestData)
 *    - updateResponseLogFields: function (responseData)
 *    - formatRequestMessage: function (requestData)
 *    - formatResponseMessage: function (responseData)
 */
module.exports.requestLogger = function (opts) {
    opts = opts || {};

    const levelFn = opts.levelFn || function (ctx, err) {
        debug('onfinishi触发，对应的code [status] %s [code] %s', ctx.status, ctx.body && ctx.body.code);
        if (err)
            return 'error';
        // 除了错误，其他时候都不应该返回 status >= 400
        if (ctx.status >= 500)
            return 'error';
        else if (ctx.body && ctx.body.code >= 500)
            return 'error';
        // code不会为 >= 500
        else if (ctx.status >= 400)
            return 'warn';
        else if (ctx.body && ctx.body.code >= 400)
            return 'warn';

        return 'info';
    };

    const durationField = opts.durationField || 'duration';

    const formatRequestMessage = opts.formatRequestMessage || function (ctx) {
        return util.format('  <-- %s %s [query]: %o',
            ctx.request.method, ctx.request.originalUrl, ctx.query || 'NO-query');
    };

    const formatResponseMessage = opts.formatResponseMessage || function (ctx, responseData) {
        let body;
        if (/^\/public\/|^\/__webpack_hmr|^\/assets\/|^\/sockjs-node\//.test(ctx.path)) {
            // 静态资源
            body = `[static resource length] ${ctx.body && ctx.body.toString().length}`;
        } else {
            if (_.isString(ctx.body) || _.isBuffer(ctx.body)) {
                body = ctx.body.toString();
                if (body.length > 200)
                    body = body.slice(0, 200) + '...';
            } else if (ctx.body && ctx.body.readable)
                body = `from file "${ctx.body.path}"`;
            else
                body = JSON.stringify(ctx.body);
        }

        return util.format('  --> %s %s 【status】 %d 【code】 %d 【duration】 %sms \n【body】 %j',
            ctx.request.method,
            ctx.request.originalUrl,
            ctx.status,
            ctx.body && ctx.body.code,
            responseData[durationField],
            body
        );
    };

    return async function requestLogger(ctx, next) {
        let requestData = {
            req: ctx.req,
        };

        requestData = updateFields(this, opts.updateLogFields, requestData);
        requestData = updateFields(this, opts.updateRequestLogFields, requestData);
        if (ctx.request.originalUrl === '/inner/api/health/status')
            ctx.log.info('/inner/api/health/status request');
        else
            ctx.log.info(requestData, formatRequestMessage(ctx, requestData));

        const startTime = new Date().getTime();
        let err;

        const onResponseFinished = function (ctx, error) {
            debug('触发了onFinish');
            let responseData = {
                req: ctx.req,
                res: ctx.res,
            };
            if (!err && error)
                err = error;

            if (err)
                responseData.err = err;

            responseData[durationField] = new Date().getTime() - startTime;

            responseData = updateFields(this, opts.updateLogFields, responseData);
            responseData = updateFields(this, opts.updateResponseLogFields,
                responseData, err);

            const level = levelFn.call(this, ctx, err);
            if (ctx.request.originalUrl === '/inner/api/health/status' && level === 'info')
                ctx.log.info('/inner/api/health/status response');
            else
                ctx.log[level](responseData, formatResponseMessage(ctx, responseData));
            debug('取得的[log level] %s', level);
            if (level === 'error') {
                console.error('——————| divide line start |—————— \n\n');
                console.error(ringbuffer.records.map((r) => JSON.stringify(r)).join('\n'));
                console.error('——————| divide line after |—————— \n\n');
            }

            // Remove log object to mitigate accidental leaks
            // ctx.log = null;
        };

        try {
            await next(); //  ignore:line
        } catch (e) {
            debug('bunyanLogger捕捉到了错误 error-message: %s', e.message);
            err = e;
        } finally {
            // Handle response logging and cleanup when request is finished
            // This ensures that the default error handler is done
            onFinished(ctx.response.res, onResponseFinished.bind(null, ctx));
        }

        if (err)
            throw err; // rethrow
    };
};

function updateFields(ctx, func, data, err) {
    if (!func)
        return data;

    try {
        if (err)
            return func.call(ctx, data, err) || data;
        else
            return func.call(ctx, data) || data;
    } catch (e) {
        ctx.log.error(e);
        return data;
    }
}

/**
 * Middleware which adds methods ctx.time(label) and ctx.timeEnd(label)
 * to koa context.
 *
 * Parameters:
 * - opts: object with the following optional properties
 *   - logLevel: name of log level to use; defaults to 'trace'
 *   - updateLogFields: function which will be called with
 *     arguments (fields) in koa context; can update fields or
 *     return a new object.
 *
 * Must use(koaBunyanLogger()) before using this middleware.
 */
module.exports.timeContext = function (opts) {
    opts = opts || {};

    const logLevel = opts.logLevel || 'trace';
    const updateLogFields = opts.updateLogFields;

    return async function timeContext(ctx, next) {
        ctx._timeContextStartTimes = {};

        ctx.time = time.bind(null, ctx);
        ctx.timeEnd = timeEnd.bind(null, ctx);

        await next(); //  ignore:line
    };

    function time(ctx, label) {
        /* validthis:true */
        const startTimes = ctx._timeContextStartTimes;

        if (startTimes[label])
            ctx.log.warn('time() called for previously used label %s', label);

        startTimes[label] = new Date().getTime();
    }

    function timeEnd(ctx, label) {
        /* validthis:true */
        const startTimes = ctx._timeContextStartTimes;
        const startTime = startTimes[label];

        if (!startTime) { // whoops!
            ctx.log.warn('timeEnd() called without time() for label %s', label);
            return;
        }

        const duration = new Date().getTime() - startTime;
        let fields = {
            label,
            duration,
            msg: label + ': ' + duration + 'ms',
        };

        fields = updateFields(this, updateLogFields, fields);
        ctx.log[logLevel](fields);

        startTimes[label] = null;
    }
};

// Export our copy of bunyan
module.exports.bunyan = bunyan;
