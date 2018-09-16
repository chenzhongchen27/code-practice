// ![](http://img-mk.lingximu.com/3eda42967fca0122278881e8f957ac2b.png)
// ![](http://img-mk.lingximu.com/c08458db4bb2fdf189df9db7e0c11fed.png)

const readline = require('readline');
process.stdin.setEncoding('utf-8');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout, prompt: '' });
rl.prompt();

rl.on('line', (line) => {
    let result = calLastChar(line);
    if (!result)
        result = 'NULL';
    console.log(result);
});

function calLastChar(str) {
    const book = {};
    for (let i = str.length - 1; i >= 0; i--) {
        const current = str[i];
        const firstIndex = str.indexOf(current);
        if (firstIndex === i && !book[current]) {
            return current;
        } else {
            book[current] = true;
        }
    }
}

// const str = 'BACCAAHEFGHFF';
// console.log(calLastChar(str));
