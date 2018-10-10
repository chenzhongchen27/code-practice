const readline = require('readline');
process.stdin.setEncoding('utf-8');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout, prompt: '' });
rl.prompt();

rl.on('line', (line) => {
    const arrs = print(parseInt(line));
    if (line < 2) {
        console.log();
    } else {
        console.log(arrs.join(','));
    }
});

function isPrime(number) {
    // 判断输入是否为number类型，是否为整数
    if (typeof number !== 'number' || !Number.isInteger(number)) {
        return false;
    }
    // 小于2都不是素数
    if (number < 2) { return false; }
    // 2是素数，被2整除的都不是素数
    if (number === 2) {
        return true;
    } else if (number % 2 === 0) {
        return false;
    }
    // 判断是否能被奇数整除，最大循环为该数值的开方
    const squareRoot = Math.sqrt(number);
    for (let i = 3; i <= squareRoot; i += 2) {
        if (number % i === 0) {
            return false;
        }
    }
    return true;
}

function print(nub) {
    const arr = [];
    for (let i = 2; i <= nub; i++) {
        if (isPrime(i)) {
            arr.push(i);
        }
    }
    return arr;
}
