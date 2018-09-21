function sortStudents(students) {
    function quickSort(arr) {
        if (arr.length <= 1)
            return arr;
        const left = [];
        const right = [];
        const mid = arr[parseInt(arr.length / 2)];
        arr.splice(parseInt(arr.length / 2), 1);
        for (let i = 0; i < arr.length; i++) {
            if (!compare(arr[i], mid)) {
                left.push(arr[i]);
            } else {
                right.push(arr[i]);
            }
        }
        return quickSort(left).concat([mid], quickSort(right));
    }

    return JSON.stringify(quickSort(students));
}

function compare(a, b) { // false 表示放前面，true 表示放后面
    if (a.class < b.class) // 小的为 false
        return false;
    else if (a.class > b.class)
        return true;
    else if (a.class === b.class) {
        if (a.score < b.score) // 小的为 false
            return true;
        else if (a.score > b.score)
            return false;
        else if (a.score === b.score)
            return false;
    }
}

const students = '[{"name":"张三","class":2,"score":64},{"name":"李四","class":1,"score":80},{"name":"王五","class":1,"score":80},{"name":"赵六","class":4,"score":94}]';
console.log(sortStudents(JSON.parse(students)));
