const readline = require('readline');
process.stdin.setEncoding('utf-8');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout, prompt: '' });
rl.prompt();

let n = 0;
const arr = [];

rl.on('line', (line) => {
    if (!n)
        n = parseInt(line);
    else {
        const arr = line.split(' ')
            .map((v) => parseFloat(v));
        main(arr);
    }
});

function cal(arr) {
    arr = arr.sort((a, b) => a - b);
    const n = arr.length;
    let result = 0;
    if (n % 2 === 0) { // 偶数，则中间的相除
        const mid = n / 2;
        const midPre = mid - 1;
        result = (arr[mid] + arr[midPre]) / 2;
    } else {
        const mid = parseInt(n / 2);
        result = arr[mid];
    }

    return result;
}

function main(arr) {
    console.log(cal(arr));
}
