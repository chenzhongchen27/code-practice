// ![](http://img-mk.lingximu.com/6a5a1ca2bff834c3618793c7efc41e3a.png)

const homes = [
    [1, 10, 3, 8],
    [12, 2, 9, 6],
    [5, 7, 4, 11],
    [3, 7, 15, 5],
];
const next = [
    [1, 0], [0, 1],
];
const book = {};
let maxNum = 0;
let maxSteps = [];
function dfs(node, preTotal, steps) {
    if (node.x === homes[0].length - 1 && node.y === homes.length - 1) {
        if (maxNum < preTotal) {
            maxNum = preTotal;
            maxSteps = steps;
        }
        return;
    }
    for (let i = 0; i < next.length; i++) {
        const currentStep = next[i]; // 现在所朝的方向
        const x = node.x + currentStep[0];
        const y = node.y + currentStep[1];
        // 没有过界 而且没有走过
        if (x >= 0 && x < homes[0].length && y >= 0 && y < homes.length && !book[toKey(x, y)]) {
            book[toKey(x, y)] = true;
            const nextNode = new Node(x, y);
            dfs(nextNode, preTotal + homes[x][y], steps.concat(homes[x][y]));
            book[toKey(x, y)] = false;
        }
    }
}

function Node(x, y) {
    this.x = x;
    this.y = y;
}

function toKey(x, y) {
    return x + '-' + y;
}

const startNode = new Node(0, 0);
book[toKey(0, 0)] = true;
dfs(startNode, 0, [homes[0][0]]);
console.log(maxSteps.join(','));
