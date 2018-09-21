const str = 'sas*dfblsandf8';
const arr = str.split('');
const marks = ['a', 'b', '*', 8];
const marksReg = marks.map((s) => new RegExp('\\' + s));
const results = [];
for (let i = 0; i < arr.length; i++) {
    let currentChart = arr[i];
    for (let j = 0; j < marksReg.length; j++) {
        if (marksReg[j].test(currentChart)) {
            currentChart = `<span style="color:red">${currentChart}</span>`;
            break;
        }
    }
    results.push(currentChart);
}
console.log(results.join(''));
