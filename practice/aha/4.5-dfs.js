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
    const next = [new Node(1, 0), new Node(0, 1), new Node(-1, 0), new Node(0, -1)];
    const startX = 6;
    const startY = 8;

    const ques = [];
    const books = {};

    dfs(startX, startY);
    console.log(ques.length);

    /**
     * 深度遍历
     * @param {*} x
     * @param {*} y
     */
    function dfs(x, y) {
        if (x > arr[0].length - 1 || y > arr.length || x < 0 || y < 0) {
            return;
        }
        const bKey = `${x}-${y}`;
        if (arr[x][y] > 0 && !books[bKey]) {
            books[bKey] = true; // 标志遍历过了
            ques.push(new Node(x, y));

            for (let i = 0; i < next.length; i++) {
                const step = next[i];
                dfs(x + step.x, y + step.y);
            }
        }
    }

    /**
     * 坐标节点
     * @param {*} x
     * @param {*} y
     */
    function Node(x, y) {
        this.x = x;
        this.y = y;
    }
}

main();
