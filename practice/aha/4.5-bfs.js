function main() {
    const arr = [
        [1, 2, 1, 0, 0, 0, 0, 0, 2, 3],
        [3, 0, 2, 0, 1, 2, 1, 0, 1, 2],
        [4, 0, 1, 0, 1, 2, 3, 2, 0, 1],
        [3, 2, 0, 0, 0, 1, 2, 4, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 5, 3, 0],
        [0, 1, 2, 1, 0, 1, 5, 4, 3, 0],
        [0, 1, 2, 3, 1, 3, 6, 2, 1, 0],
        [0, 0, 3, 4, 8, 9, 7, 5, 0, 0],
        [0, 0, 0, 3, 7, 8, 6, 0, 1, 2],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    ];
    const startX = 6;
    const startY = 8;
    console.log(bfs(startX, startY, arr));
}

/**
 * 广度遍历
 * @param {*} startX
 * @param {*} startY
 * @param {*} arr - 处理的两维数组
 * @return {number} - 面积
 */
function bfs(startX, startY, arr) {
    let head = 0;
    const ques = [];
    const books = {};
    const firstNode = new Node(startX, startY);
    books[startX + '-' + startY] = firstNode;
    // 初始化第一个节点
    ques.push(firstNode);

    const next = [new Node(1, 0), new Node(0, 1), new Node(-1, 0), new Node(0, -1)];
    while (ques.length > head) {
        const headNode = ques[head];
        for (let i = 0; i < 4; i++) {
            const step = next[i];
            const currentNode = new Node(headNode.x + step.x, headNode.y + step.y);
            const bKey = currentNode.x + '-' + currentNode.y;
            const cx = currentNode.x;
            const cy = currentNode.y;

            if (cx > arr[0].length - 1 || cy > arr.length) {
                continue; // 国界
            }

            if (arr[cx][cy] > 0 && !books[bKey]) { // 陆地，且没有走过
                ques.push(currentNode);
                books[bKey] = true;
            }
        }
        head++;
    }
    return ques.length;
}

/**
 * 坐标
 * @param {*} x
 * @param {*} y
 */
function Node(x, y) {
    if (!(this instanceof Node)) {
        return new Node(x, y);
    }
    this.x = x;
    this.y = y;
}

main();
