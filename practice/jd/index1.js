const readline = require('readline');
process.stdin.setEncoding('utf-8');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout, prompt: '' });
rl.prompt();

let n = 0;
const arr = [];

rl.on('line', (line) => {
    if (!n)
        n = parseInt(line);
    else {
        const [a, b, c, d] = line.split(' ');
        arr.push([
            parseInt(a),
            parseInt(b),
            parseInt(c),
            parseInt(d),
        ]);
    }
    if (arr.length === n)
        main(n, arr);
});

function main(n, totalQuestions) {
    const totalTime = 120;
    let maxScore = 0;
    function dfs(i = 0, totalScore = 0, consumeTime = 0) {
        if (i >= n)
            return;
        if (consumeTime >= 120) {
            return null;
        }
        const current = totalQuestions[i];
        const [pi, ai, qi, bi] = current;
        if (consumeTime + pi <= totalTime) {
            if (maxScore < totalScore + ai) {
                maxScore = totalScore + ai;
            }
            dfs(i + 1, totalScore + ai, consumeTime + pi);
        }
        if (consumeTime + qi <= totalTime) {
            if (maxScore < totalScore + bi) {
                maxScore = totalScore + bi;
            }
            dfs(i + 1, totalScore + bi, consumeTime + qi);
        }
        dfs(i + 1, totalScore, consumeTime);
    }
    dfs();
    console.log(maxScore);
}
