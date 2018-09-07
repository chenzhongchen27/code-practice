const assert = require('assert');
const { Image } = require('@model/index');

/**
 * 保存 Image 信息
 * @param {*} url - 图片地址
 */
function saveImage(url) {
    assert(url);

    return new Image().save({ url });
}

module.exports = {
    saveImage,
};
