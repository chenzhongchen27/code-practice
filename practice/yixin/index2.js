const readline = require('readline');
process.stdin.setEncoding('utf-8');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout, prompt: '' });
rl.prompt();

rl.on('line', (line) => {
    const rawArr = line.split(' ').map((v) => parseInt(v));
    const arr = [];
    for (let i = 0; i < rawArr.length; i += 2) {
        const a = rawArr[i];
        const b = rawArr[i + 1];
        arr.push([a, b]);
    }
    main(arr);
});

function main(arr) {
    let maxArr = [];
    const book = {};
    function dfs(preArr) {
        if (preArr.length > maxArr.length) {
            maxArr = preArr;
        }
        const pre = preArr[preArr.length - 1];
        for (let i = 0; i < arr.length; i++) {
            const cur = arr[i];
            if (pre[1] < cur[0] && !book[toKey(cur)]) {
                book[toKey(cur)] = true;
                dfs(preArr.concat([cur]));
                book[toKey(cur)] = false;
            }
        }
    }

    function toKey(cur) {
        return cur.join('.');
    }

    const start = arr[0];
    book[toKey(start)] = true;
    dfs([start]);
    console.log(maxArr.map(([a, b]) => `(${a},${b})`).join(''));
}
