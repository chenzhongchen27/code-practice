const { User } = require('@model/index');

/**
 * 通过 id 获取用户信息
 * @param {number} id
 */
function getUserById(id) {
    return new User({ id }).fetch().then((m) => {
        if (!m) { return null; } else { return m.toJSON(); }
    });
}

// 通过 user 同时获取购物车
function userToOneCard(id) {
    return new User({ id }).fetch({
        withRelated: 'cart',
    }).then((m) => {
        if (!m) { return null; } else { return m.toJSON(); }
    });
}

module.exports = {
    getUserById,
    userToOneCard,
};
