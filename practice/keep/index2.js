// ![](http://img-mk.lingximu.com/dbf9c72dcc4dff630b279ffae2ac40bb.png)
// ![](http://img-mk.lingximu.com/7d73bd96291bb8308c61438f6c142b81.png)

const readline = require('readline');
process.stdin.setEncoding('utf-8');

let a, b;

const rl = readline.createInterface({ input: process.stdin, output: process.stdout, prompt: '' });
rl.prompt();

rl.on('line', (line) => {
    if (!a)
        a = line;
    else if (!b) {
        b = line;
        main(a, b);
    }
});

function main(a, b) {
    // const a = 'AGGTAB';
    // const b = 'GXTXAYB';
    let max = 0;
    function findMaxSubStr(aStartIndex, bStartIndex, preNum) {
        // a 已经遍历完
        if (aStartIndex >= a.length) {
            if (max < preNum) {
                max = preNum;
            }
            return;
        }
        const aCurrentChar = a[aStartIndex];

        for (let i = bStartIndex; i < b.length; i++) {
            if (aCurrentChar === b[i]) {
                // 匹配
                findMaxSubStr(aStartIndex + 1, i + 1, preNum + 1);
                // // 能匹配，但不匹配
                findMaxSubStr(aStartIndex + 1, i, preNum);
            } else {
                // 不能匹配，且不匹配
                findMaxSubStr(aStartIndex + 1, i, preNum);
            }
        }
    }

    findMaxSubStr(0, 0, 0);
    console.log(max);
}
