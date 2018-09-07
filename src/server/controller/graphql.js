const patchFilesToBody = function patchFilesToBody(ctx, next) {
    ctx.request.body = ctx.request.fields;
    return next();
};

module.exports = {
    patchFilesToBody,
};

