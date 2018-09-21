const str = 'abc';
const arr = str.split('');
const book = {};
const results = [];
function dfs(i, pre) {
    if (pre.length === 3) {
        results.push(pre);
        return;
    }

    for (let i = 0; i < arr.length; i++) {
        if (!book[i]) {
            book[i] = true;
            dfs(i + 1, pre + arr[i]);
            book[i] = false;
        }
    }
}
dfs(0, '');
console.log(results);
