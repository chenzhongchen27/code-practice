function parse(arr) {
    const result = [];
    // code
    function dfs(obj) {
        // 组合新对象
        const cur = {
            _id: obj._id,
        };
        if (obj.parent)
            cur.parent = obj.parent;

        result.push(cur);
        // 遍历子对象
        if (obj.children) {
            obj.children.forEach((ele) => {
                dfs(ele);
            });
        }
    }
    // 第一层数组
    arr.forEach((ele) => {
        dfs(ele);
    });

    return result;
}
