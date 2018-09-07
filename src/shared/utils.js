// 打乱数组
function disturbArray(array) {
    const len = array.length;
    for (let i = 0; i < len - 1; i++) {
        const idx = Math.floor(Math.random() * (len - i));
        const temp = array[idx];
        array[idx] = array[len - i - 1];
        array[len - i - 1] = temp;
    }
    return array;
}

exports.disturbArray = disturbArray;
