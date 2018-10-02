// ![](http://img-mk.lingximu.com/9b2a3e95da749c6bfd93a2663f4c27d0.png)
// ![](http://img-mk.lingximu.com/26b8f5b28a309ac9b6761e0c86249bdf.png)
// ![](http://img-mk.lingximu.com/855d4de82d8144ab950cce9fe1c15c5f.png)

const readline = require('readline');
process.stdin.setEncoding('utf-8');

const n = 0;
const arr = [];

const rl = readline.createInterface({ input: process.stdin, output: process.stdout, prompt: '' });
rl.prompt();

rl.on('line', (line) => {
    let [str, newScore] = line.split(' ');
    newScore = parseFloat(newScore);
    const arr = str.split(',').map((v) => parseFloat(v));
    console.log(queryScoreInject(arr, newScore));
});

function queryScoreInject(arr, newScore) {
    if (arr.indexOf(newScore) !== -1) {
        return arr.indexOf(newScore);
    } else {
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] > newScore && arr[i - 1] < newScore) {
                return i;
            }
        }
    }
}

// const arr = [21, 23, 25, 26];
// console.log(queryScoreInject(arr, 25));
