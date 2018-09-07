const { handleProxyError } = require('@s-service/proxy');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer();

// 透传方法，暂时不用
async function proxyTo(ctx, next) {

}

/**
 * 转发到百度
 */
function toBaidu(ctx, next) {
    ctx.url = ctx.url.replace(/.*\/redirect\/baidu/, '');
    ctx.respond = false;
    delete ctx.req.headers.host;
    delete ctx.req.headers.referer;
    proxy.web(ctx.req, ctx.res, {
        target: 'https://www.baidu.com',
        headers: {
            Host: 'baidu.com',
            Referer: 'https://www.baidu.com/',
        },
    }, handleProxyError.bind(null, ctx));
}

module.exports = {
    proxyTo,
    toBaidu,
};
