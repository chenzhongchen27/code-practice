// 处理首页
function index(ctx, next) {
    // 进行一些权限刷新

    return next();
}

module.exports = {
    index,
};
