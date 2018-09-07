require('../../../config/index');
const log = console.log.bind(console, '--> result \n %O');
const { userToOneCard } = require('./userDb');
const { cartToOneUser, getCartById } = require('./cartDb');
const { getCategories } = require('./categoryDb');
const { getFruitById } = require('./fruitDb');

/**
 * 一对一： 用户 <----> 购物车
 */
// userToOneCard(1)
//     .then((m) => {
//         log(m);
//     });

// cartToOneUser(1)
//     .then((m) => {
//         log(m);
// });

/**
 * 一对多： 分类 <----> 各种水果
 */

// getCategories()
//     .then((m) => {
//         log(m);
//     });

// getFruitById(1)
//     .then((m) => {
//         log(m);
//     });

/**
 * 多对多 购物车<--->水果
 */
// getCartById(1)
//     .then((m) => {
//         log(m);
//     });

// getFruitById(1)
//     .then((m) => {
//         log(m);
// });
