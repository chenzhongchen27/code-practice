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

const obj = [{
    _id: 1,
    parent: null,
    children: [{
        _id: 2,
        parent: 1,
    }, {
        _id: 3,
        parent: 1,
        children: [{
            _id: 5,
            parent: 3,
        }, {
            _id: 6,
            parent: 3,
        }],
    }, {
        _id: 4,
        parent: 1,
    }],
}];
// 结果
// [ { _id: 1 },
//     { _id: 2, parent: 1 },
//     { _id: 3, parent: 1 },
//     { _id: 5, parent: 3 },
//     { _id: 6, parent: 3 },
//     { _id: 4, parent: 1 } ]

console.log(parse(obj));
