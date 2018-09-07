/* eslint-disable no-debugger */
const { getUserById } = require('@s-service/base/userDb');
const { getFruitBeyondLikes } = require('@s-service/base/fruitDb');
const { getCartById } = require('@s-service/base/cartDb');
const { getCategories } = require('@s-service/base/categoryDb');
const { getOrderById, getOrdersByUserName } = require('@s-service/base/orderDb');

const resolvers = {
    Query: {
        user: (parent, { id }) => getUserById(id),
        fruits: (parent, { likes = 0 }) => getFruitBeyondLikes(likes),
        cart: (root, { id }) => getCartById(id),
        order: (parent, { id }) => getOrderById(id),
        orders: (parent, { name }) => getOrdersByUserName(name),
        categories: (root) => getCategories(),
    },
};

module.exports = resolvers;
