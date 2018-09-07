const arr = [6, 1, 2, 7, 9, 2, 3, 4, 5, 10, 8];

(function quickSort(left, right) {
    if (left >= right) // 递归跳出
        return;

    const tmp = arr[left]; // 基点
    let i = left;
    let j = right;
    while (i !== j) {
        while (arr[j] >= tmp && i < j) { // 关键的一步，要和基数调换的那一方先走
            j--;
        }
        while (arr[i] <= tmp && i < j) {
            i++;
        }

        if (i < j) {
            const t = arr[i];
            arr[i] = arr[j];
            arr[j] = t;
        }
    }

    arr[left] = arr[j];
    arr[j] = tmp;
    quickSort(i + 1, right);
    quickSort(left, i - 1);
})(0, arr.length - 1);

console.log(arr);
