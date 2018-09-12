const map = [
    [null, null, null, null, null],
    [null, null, true, true],
    [null, true, null, true, true],
    [null, true, true, null, true, true],
    [null, null, true, true, null, true],
    [null, null, null, true, true],
];

function bfs() {
    const ques = [];
    ques.push(new Node(1, 0, null));
    let head = 0;
    const book = {
        1: true,
    };
    let flag = false;

    while (head < ques.length && !flag) {
        const current = ques[head];
        for (let i = 1; i <= 5; i++) {
            if (map[current.x][i] && !book[i]) {
                book[i] = true;
                ques.push(new Node(i, current.s + 1, current));
            }

            const lastNode = ques[ques.length - 1];
            if (lastNode.x === 5) {
                flag = true;
                break;
            }
        }

        head++;
    }

    const steps = [];
    let curNode = ques.pop();
    while (curNode) {
        steps.push(curNode.x);
        curNode = curNode.pre;
    }
    console.log(steps.reverse().join('.'));
}

bfs();

/**
 * 节点
 * @param {*} x
 * @param {*} s
 * @param {*} pre
 */
function Node(x, s, pre) {
    this.x = x;
    this.s = s;
    this.pre = pre;
}
