// ![](http://img-mk.lingximu.com/94c76924cfaf48ca982a2c39183ad38c.png)
// ![](http://img-mk.lingximu.com/87f8967e6b92022210e85d76f361e40d.png)
// ![](http://img-mk.lingximu.com/d4d7d7e7024f212b859cb2e68290b25e.png)
// ![](http://img-mk.lingximu.com/0641284945f5c25b68c7f6bf2a30355d.png)
// ![](http://img-mk.lingximu.com/7ce0b58b16be765c521caf17d424f9d6.png)
// ![](http://img-mk.lingximu.com/d15c351f1a20da93009a9b7c9a792868.png)

function judge(reg, str) {
    let flag = true;
    if (!isNum(str)) {
        flag = false;
        return;
    }

    for (let i = 0; i < reg.length; i++) {
        const currentReg = reg[i];
        const currentChar = str[i];

        if (isNum(currentReg)) {
            if (currentReg !== currentChar) {
                flag = false;
            }
            continue;
        } else if (currentReg === '*') {
            if (i === 0) {
                continue;
            } else if (reg[i - 1] === '*') {

            }
        }
    }
}

function isNum(str) {
    return /^[0-9]+$/.test(str);
}
