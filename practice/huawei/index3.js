const readline = require('readline');
process.stdin.setEncoding('utf-8');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout, prompt: '' });
rl.prompt();
let aStr;
let bStr;
rl.on('line', (line) => {
    if (!aStr) {
        aStr = line;
    } else {
        bStr = line;
        console.log(multiplyStrAndStr(aStr, bStr));
    }
});

function multiplyStrAndStr(a, b) {
    const results = [];
    const len = b.length - 1;
    for (let i = len; i >= 0; i--) {
        const current = b[i]; // 现在的第二个乘数
        if (current !== '0') {
            const result = multiplyStrAndOne(a, current, len - i);
            results.push(result);
        }
    }
    return largeIntegerAddition(...results);
}
// const a = '150';
// const b = '60';
// console.log(multiplyStrAndStr(a, b));

/**
 * 字符串乘一个数 ，如 '1056' * '8'
 * @param {*} str
 * @param {*} b
 * @param {number} num - 位数
 */
function multiplyStrAndOne(str, b, num) {
    const len = str.length;
    let pre = '0';
    for (let i = len - 1; i >= 0; i--) {
        const current = str[i];
        if (current !== '0') {
            const result = multiplyOneAndOne(current, b, len - 1 - i);
            pre = largeIntegerAddition(pre, result);
        }
    }
    pre = pre.toString();
    for (let i = 0; i < num; i++)
        pre += '0';
    return pre;
}

// console.log(multiplyStrAndOne('15', '1', 1));

/**
 * 两个一位数相乘 ,如 "5" * "6"
 * @param {*} a - 第一个乘数
 * @param {*} b - 第二个乘数
 * @param {*} num - 加几个零
 */
function multiplyOneAndOne(a, b, num = 0) {
    a = parseFloat(a);
    b = parseFloat(b);
    let result = a * b;
    result = result.toString();
    for (let i = 0; i < num; i++)
        result += '0';

    return result;
}

// console.log(multiplyOneAndOne(9, 6, 1));

/**
 * 大整数相加
 * @param {*} a
 * @param {*} b
 */
function largeIntegerAddition(a, b) {
    let bigNum1 = a;
    let bigNum2 = b;

    if (!bigNum2) {
        return isNumberString(bigNum1) ? trimHeadZero(bigNum1) : '0';
    } else {
        if (!isNumberString(bigNum1, bigNum2)) {
            return '0';
        }

        bigNum1 = trimHeadZero(bigNum1);
        bigNum2 = trimHeadZero(bigNum2);

        let carry = 0; // 进位
        const bigNum1Split = bigNum1.split('').reverse();
        const bigNum2Split = bigNum2.split('').reverse();
        let result = '';
        const maxNumSize = bigNum1Split.length > bigNum2Split.length ? bigNum1Split.length : bigNum2Split.length;

        for (let i = 0; i < maxNumSize; i++) {
            const n1 = bigNum1Split[i] ? +bigNum1Split[i] : 0;
            const n2 = bigNum2Split[i] ? +bigNum2Split[i] : 0;
            const sum = (n1 + n2 + carry).toString();
            if (sum.length > 1) {
                carry = +sum.slice(0, 1);
                result = sum.slice(1, 2) + result;
            } else {
                carry = 0;
                result = sum + result;
            }
        }

        if (carry !== 0) {
            result = carry + result;
        }

        if (arguments[2]) {
            const argumentArr = Array.prototype.slice.call(arguments, 0).slice(2);
            argumentArr.unshift(result);
            return largeIntegerAddition.apply(this, argumentArr);
        } else {
            return result;
        }
    }

    function isNumberString() {
        let result = true;
        for (let i = arguments.length; i--;) {
            if (typeof arguments[i] !== 'string' || !/^\d+$/.test(arguments[i])) {
                console.error('arguments format is incorrect!');
                result = false;
                break;
            }
        }
        return result;
    }

    function trimHeadZero(numberStr) {
        return numberStr.replace(/^0*/, '');
    }
}

// console.log(largeIntegerAddition('0', '0013', '015'));
