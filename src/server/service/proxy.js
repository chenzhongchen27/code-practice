const assert = require('assert');
/**
 * 用法 handleProxyError.bind(ctx)
 * @param {Object} ctx - 调用的ctx
 * @param {Object} e - 触发的错误
 */
function handleProxyError(ctx, e, req, res, url) {
    assert(ctx);

    const status = {
        ECONNREFUSED: 503,
        ETIMEDOUT: 504,
    }[e.code];
    ctx.log.error('代理出错，错误信息 id: %s e: %o', ctx.reqId, e);
    if (status) {
        ctx.res.statusCode = status;
        ctx.res.statusMessage = e.errno;
        ctx.res.end(e.message);
    } else {
        ctx.res.statusCode = 500;
        ctx.res.statusMessage = 'proxy error';
        ctx.res.end(e.message);
    }
}

module.exports = {
    handleProxyError,
};
