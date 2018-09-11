const readline = require('readline');
process.stdin.setEncoding('utf-8');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout, prompt: '' });
rl.prompt();

rl.on('line', (line) => {
    const [a, b] = line.split(' ');
    console.log(a.indexOf(b));
});
