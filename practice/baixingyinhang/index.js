// ![](http://img-mk.lingximu.com/b4c82caac665fb7c28af888db23046a7.png)
// ![](http://img-mk.lingximu.com/2c97a75d08a71a039130beb30dc3642b.png)

const readline = require('readline');
process.stdin.setEncoding('utf-8');

let n = 0;
const arr = [];

const rl = readline.createInterface({ input: process.stdin, output: process.stdout, prompt: '' });
rl.prompt();

rl.on('line', (line) => {
    if (!n)
        n = parseInt(line);
    else {
        arr.push(parseInt(line));
    }

    if (arr.length === n)
        console.log(quickSort(arr).join('\n'));
});

function quickSort(arr) {
    if (arr.length <= 1)
        return arr;
    const midIndex = parseInt(arr.length / 2);
    const mid = arr[midIndex];
    arr.splice(midIndex, 1);
    const left = [];
    const right = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > mid) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return quickSort(left).concat([mid], quickSort(right));
}

// const arr = [3, 2, 0, 4, 1];
// console.log(quickSort(arr));
