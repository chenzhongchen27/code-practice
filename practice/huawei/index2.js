// ![](http://img-mk.lingximu.com/199c0c844159f5e40ebc63bc87c51ce9.png)
// ![](http://img-mk.lingximu.com/21c44a4aab619c15769de72d2adf8b0e.png)

const readline = require('readline');
process.stdin.setEncoding('utf-8');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout, prompt: '' });
rl.prompt();

rl.on('line', (line) => {
    const arr = line.split(' ');
    const result = reverseEachOfArr(arr);
    console.log(result.join(' '));
});

// const str = 'Yes sir';
// const arr = str.split(' ');

function reverseEachOfArr(arr) {
    return arr.map((v) => {
        const len = v.length;
        const result = [];
        for (let i = 0; i < len; i++) {
            result[len - i] = v[i];
        }
        return result.join('');
    });
}

// console.log(reverseEachOfArr(arr));
