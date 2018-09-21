const readline = require('readline');
process.stdin.setEncoding('utf-8');

const n = 0;
const arr = [];

const rl = readline.createInterface({ input: process.stdin, output: process.stdout, prompt: '' });
rl.prompt();

rl.on('line', (line) => {
    console.log(parsePath(line));
});

function parsePath(path) {
    const results = [];
    const paths = path.split('/');
    for (let i = 0; i < paths.length; i++) {
        const current = paths[i];
        if ((!current) || current === '.')
            continue;

        if (current === '..') {
            results.pop();
        } else {
            results.push(current);
        }
    }
    return '/' + results.join('/');
}

// const path = '/a/././b//../../c/';
// console.log(parsePath(path));
