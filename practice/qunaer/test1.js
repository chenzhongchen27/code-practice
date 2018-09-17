const line = read_line();
// const line = '4 3 3';

const [n, endI, endJ] = line.split(' ').map((v) => parseInt(v));

const book = {};
let step = 0;
function dfs(i, j, preX, preY) {
    if (i === endI && j === endJ) {
        print(step + 1);
    }
    if (i > n || j > n || i < 1 || j < 1) {
        return;
    }
    if (step > n * n) {
        return;
    }
    const x = i - preX;
    const y = j - preY;
    if (!book[toKey(i + x, j + y)] && !(i + x > n || j + y > n || i + x < 1 || j + y < 1)) { // 直走
        step++;
        book[toKey(i + x, j + y)] = true;
        dfs(i + x, j + y, i, j);
    } else {
        // 之前往右
        if (!book[toKey(i, j + 1)] && x === 1 && y === 0 && !(i > n || j + 1 > n || i < 1 || j + 1 < 1)) {
            step++;

            book[toKey(i, j + 1)] = true;
            dfs(i, j + 1, i, j);
        // 之前往下
        } else if (!book[toKey(i - 1, j)] && x === 0 && y === 1 && !(i - 1 > n || j > n || i - 1 < 1 || j < 1)) {
            step++;

            book[toKey(i - 1, j)] = true;
            dfs(i - 1, j, i, j);
        // 之前往左
        } else if (!book[toKey(i, j - 1)] && x === -1 && y === 0 && !(i > n || j - 1 > n || i < 1 || j - 1 < 1)) {
            step++;

            book[toKey(i, j - 1)] = true;
            dfs(i, j - 1, i, j);
        // 之前往上
        } else if (!book[toKey(i + 1, j)] && x === 0 && y === -1 && !(i + 1 > n || j > n || i + 1 < 1 || j < 1)) {
            step++;

            book[toKey(i + 1, j)] = true;
            dfs(i + 1, j, i, j);
        }
    }
}
function toKey(i, j) {
    return String(i) + '-' + String(j);
}

book[toKey(1, 1)] = true;
dfs(1, 1, 0, 1);
