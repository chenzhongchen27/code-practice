const obj = {
    a: 1,
    b: {
        c: 2,
        d: {
            e: 3,
        },
    },
    f: 4,
};

const results = [];
function dfs(obj, previous = '') {
    for (const i in obj) {
        let key = '';
        if (previous)
            key = `${previous}.${i}`;
        else
            key = i;

        if (typeof obj[i] === 'object') {
            dfs(obj[i], key);
        } else {
            results.push(`${key} = ${obj[i]}`);
        }
    }
}
dfs(obj);
console.log(results);
