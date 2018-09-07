const assert = require('assert');
const { Order, User } = require('@model/index');

/**
 * 通过 id 获取对应 Order 信息
 * @param {*} id
 */
function getOrderById(id) {
    assert(id);
    return new Order({ id })
        .fetch({
            withRelated: ['fruits'],
        }).then((u) => {
            if (!u) { return {}; } else { return u.toJSON(); }
        });
}

function getOrdersByUserName(name) {
    assert(name);
    return new User({ name })
        .fetch({
            withRelated: ['orders'],
        })
        .then((u) => {
            const orders = u.related('orders');
            return orders.load('archives');
        })
        .then((c) => c.toJSON());
}

module.exports = {
    getOrderById,
    getOrdersByUserName,
};
