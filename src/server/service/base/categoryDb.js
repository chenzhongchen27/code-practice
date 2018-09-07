const { Category } = require('@model/index');
const { disturbArray } = require('@shared/utils');

/**
 * 通过 id 获取用户信息
 * @param {number} id
 */
function getCategories(id) {
    return Category.fetchAll()
        .then((c) => c.load(['fruits', 'fruits.image']))
        .then((m) => {
            if (!m) { return null; } else { return m.toJSON(); }
        })
        .then((mArr) => {
            mArr.forEach((m) => {
                m.fruits = disturbArray(m.fruits);
            });
            return mArr;
        });
}

module.exports = {
    getCategories,
};
