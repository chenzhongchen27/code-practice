const config = require('config');

module.exports = (option = [{
    path: /^\/?private/, // 需要进行认证的路径
    realm: 'private',
    name: config.private.name,
    pass: config.private.pass,
}]) => function auth(ctx, next) {
    const controlObj = option.filter((o) => o.path.test(ctx.path))[0];
    if (!controlObj)
        return next();

    const authStr = ctx.get('authorization');
    if (authStr) {
        const namePass = authStr.split(/\s/)[1];
        const [name, pass] = Buffer.from(namePass, 'base64').toString().split(':');
        if (name === controlObj.name && pass === controlObj.pass) {
            return next();
        }
    }

    ctx.status = 401;
    ctx.message = 'Authorization Required';
    ctx.set('WWW-Authenticate', `Basic realm="${controlObj.realm}"`);
};
