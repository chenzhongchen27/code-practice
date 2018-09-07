function Permutation(str) {
    let next = [];
    const books = {};
    const list = [];
    const ques = [];

    (function parse() {
        Array.from(str).forEach((s) => {
            if (!books[s]) {
                books[s] = 1;
            } else {
                books[s] += 1;
            }
        });
        next = Object.keys(books).sort();
    })();

    (function dfs() {
        if (ques.length === str.length) {
            if (ques.length > 0)
                list.push(ques.join(''));
            return;
        }
        for (let i = 0; i < next.length; i++) {
            if (books[next[i]] === 0)
                continue;
            books[next[i]]--;
            ques.push(next[i]);
            dfs();
            ques.pop();
            books[next[i]]++;
        }
    })();
    return list;
}
const l = Permutation('');
console.log(l);
