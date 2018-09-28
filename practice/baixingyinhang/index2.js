// ![](http://img-mk.lingximu.com/ddc7effa1c174e52dcb44e209389def1.png)
// ![](http://img-mk.lingximu.com/34e069727181f1a9b5dc2e45dfcd2955.png)

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
        console.log(main(arr));
});

function main(nums) {
    const opts = ['+', '*', '-', '-', '/', '/'];
    function dfs(nums, len, aim) {
        for (let i = 0; i < len; i++) {
            for (let j = i + 1; j < len; j++) {
                const numij = [nums[i], nums[j]];
                nums[j] = nums[len - 1];
                for (let k = 0; k < 6; k++) {
                    nums[i] = '(' + numij[k % 2] + opts[k] + numij[(!(k % 2) * 1)] + ')';
                    if (dfs(nums, len - 1, aim)) {
                        return true;
                    }
                }
                nums[i] = numij[0];
                nums[j] = numij[1];
            }
        }
        return (len === 1) && (Math.abs((new Function('return' + nums[0])()) - aim) < 0.0000001);
    }

    if (dfs(nums, nums.length, 24)) {
        return 1;
    } else {
        return 0;
    }
}
// const numArr = [20, 2, 3, 4];
// console.log(main(numArr));
// console.log(getexp(24, numArr));
