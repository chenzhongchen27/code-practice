const assert = require('assert');
const { Fruit } = require('@model/index');
const { disturbArray } = require('@shared/utils');

/**
 * 保存 fruit 信息
 * @param {*} params
 * @param {*} params['image_id'] - 图片对应的 id
 * @param {*} params.name - 水果名字
 * @param {*} params.price - 水果价格
 */
function saveFruit(params) {
  const { image_id, name, price } = params; // eslint-disable-line
    assert(image_id, '必须有图片 id');
    assert(name, '必须有水果名字');
    assert(typeof price === 'number', '价格必须为数字');

    return new Fruit().save(params);
}

/**
 * 通过 id 获取对应 fruit 信息
 * @param {*} id
 */
function getFruitById(id) {
    assert(id);
    return new Fruit({ id })
        .fetch({
            withRelated: ['image', 'category', 'carts'],
        })
        .then((u) => {
            if (!u) { return {}; } else { return u.toJSON(); }
        });
}

/**
 * 是否存在对应 id 的水果
 * @param {*} id
 */
function isExistFruit(id) {
    assert(id);
    return new Fruit({ id })
        .fetch()
        .then((u) => {
            if (!u) { return false; } else { return true; }
        });
}

/**
 * 通过 id 获取对应 fruit 信息
 * @param {*} id
 */
function deleteFruitById(id) {
    assert(id);
    return new Fruit({ id }).destroy();
}

/**
 * 获取 likes 超过一定数量的 fruit
 * @param {number} like - 要超过的 fruit
 */
function getFruitBeyondLikes(like = 0) {
    return Fruit.query((qb) => {
        qb.where('likes', '>=', like);
    }).fetchAll()
        .then((c) => c.load(['image', 'category']))
        .then((u) => {
            if (!u) { return {}; } else { return u.toJSON(); }
        })
        .then((m) => {
            m = disturbArray(m);
            return m;
        });
}

/**
 * 获取所有 fruit
 */
function getAllFruits() {
    return new Fruit().fetchAll()
        .then((c) => c.load(['image', 'category']))
        .then((u) => {
            if (!u) { return {}; } else { return u.toJSON(); }
    });
}

/**
 * 获取所有水果
 */
function getAllFruits() {
    return new Fruit().fetchAll()
        .then((c) => c.toJSON());
}

module.exports = {
    saveFruit,
    getFruitById,
    getFruitBeyondLikes,
    getAllFruits,
    deleteFruitById,
    isExistFruit,
};
