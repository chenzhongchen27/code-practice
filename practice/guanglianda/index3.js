// ![](http://img-mk.lingximu.com/4d398a3d2d586359482ecfa0bb116b52.png)

function numOfTrees(orchardIndex) {
    const binaries = toBinary(orchardIndex);
    let binaryNum = 0;
    binaries.forEach((v) => {
        if (v === 1)
            binaryNum++;
    });
    return binaryNum ^ orchardIndex;
}

function toBinary(num) {
    const results = [];
    while (num > 1) {
        results.push(num % 2);
        num = parseInt(num / 2);
    }
    if (num !== 0)
        results.push(num);
    return results;
}

console.log(numOfTrees(5));
