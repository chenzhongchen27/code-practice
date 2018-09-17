const s = '3[a,b,2[c,d],f,g]';
function bfs(s) {
    if (s.length <= 1) {
        return s;
    }
    const time = s[0];
    const other = s.slice(1, -1);
    let content = '';
    for (let i = 0; i < other.length; i++) {
        if (/[a-zA-Z]/.test(other[i])) {
            content += other[i];
        } else if (other[i] === ',') {
            continue;
        } else if (/[1-9]/.test(other[i])) {
            let num = 0;
            let middle = other[i];
            for (let j = i + 1; j < other.length; j++) {
                middle += other[j];
                if (other[j] === '[') {
                    num++;
                } else if (other[j] === ']') {
                    num--;
                }
                if (num === 0) {
                    i = j;
                    break;
                }
            }
            content += bfs(middle);
        }
    }
    return repeat(time, content);
}
console.log(bfs(s));

function repeat(time, str) {
    let result = str;
    for (let i = 1; i < time; i++) {
        result += str;
    }
    return result;
}
