const { handleProxyError } = require('@s-service/proxy');
const config = require('config');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer();
proxy.on('proxyReq', (proxyReq, req, res) => {
    const ctx = req.koaCtx;
    ctx.log.info('触发了proxyReq');
    if (!ctx)
        return;

    if (ctx.method !== 'GET') {
        const bodyData = JSON.stringify(ctx.request.body.fields);
        proxyReq.setHeader('Content-Type', 'application/json');
        proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
        proxyReq.write(bodyData);
    }
});
proxy.on('proxyRes', (proxyRes, req, res) => {
    const ctx = req.koaCtx;
    if (!ctx)
        return;

    ctx.log.info('触发了proxyRes');
    ctx.log.info('RAW Response from the target %s', JSON.stringify(proxyRes.headers, true, 2));
});

// 透传方法，暂时不用
async function proxyTo(ctx, next) {

}

module.exports = {
    proxyTo,
};
