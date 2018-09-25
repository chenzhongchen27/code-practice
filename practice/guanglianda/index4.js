// ![](http://img-mk.lingximu.com/94f919e373d61b5c9bb397373ba1116d.png)
// ![](http://img-mk.lingximu.com/832e802ec15ef3e1dec5e2499876bcea.png)

function bfs(rootNode) {
    const nodes = [];
    let tail = 0;
    nodes[tail] = rootNode;

    // 广度遍历
    while (tail <= nodes.length - 1) {
        const current = nodes[tail];
        if (current.left)
            nodes.push(current.left);
        if (current.right)
            nodes.push(current.right);

        ++tail;
    }
    return nodes;
}

function findRooNode(randomNode) {
    let currentNode = randomNode;
    while (currentNode.parent) {
        currentNode = currentNode.parent;
    }
    return currentNode;
}

function main(existNode) {
    // 通过某个节点找到 root 节点
    const rootNode = findRooNode(existNode);
    // 通过 rootNode 进行广度优先遍历
    const nodes = bfs(rootNode);
    console.log(nodes);
}
