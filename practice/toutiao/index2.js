const readline = require('readline');
process.stdin.setEncoding('utf-8');

let n = 0;
const arr = [];

const rl = readline.createInterface({ input: process.stdin, output: process.stdout, prompt: '' });
rl.prompt();
rl.on('line', (line) => {
    if (!n)
        n = parseInt(line);
    else
        arr.push(line);

    if (n === arr.length)
        main(arr);
});

function main(arr) {
    // const arr = [
    //     'bytedance',
    //     'toutiaohao',
    //     'toutiaoapp',
    //     'iesaweme',
    //     'iestiktok',
    // ];
    const startArr = [];
    arr.forEach((s, arrIndex) => {
        startArr.push({
            s, arrIndex,
        });
    });

    const flags = [];
    function parseFlags(arr, index, pre) {
        const book = {};
        arr.forEach(({ s, arrIndex }) => {
            const currentChar = s[index];
            if (!currentChar) {
                flags.push({ s, arrIndex, flag: s });
                return;
            }

            if (!book[currentChar]) {
                book[currentChar] = {
                    flags: [{ s, arrIndex, flag: pre + currentChar }],
                };
            } else {
                book[currentChar].flags.push({ s, arrIndex, flag: pre + currentChar });
            }
        });
        for (const key in book) {
            if (book[key].flags.length === 1) {
                flags.push(book[key].flags[0]);
            } else if (book[key].flags.length >= 2) {
                // flags.push(book[key].flags.pop());
                parseFlags(book[key].flags, index + 1, book[key].flags[0].flag);
            }
        }
    }
    parseFlags(startArr, 0, '');
    flags.sort((a, b) => a.arrIndex > b.arrIndex);

    console.log(flags.map((o) => o.flag).join('\n'));
}
