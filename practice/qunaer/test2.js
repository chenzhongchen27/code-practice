// const line1 = '3 2';
// const line2 = '2 3 4';

let line1, line2;
let line = '';
while ((line = read_line())) {
    if (!line1)
        line1 = line;
    else {
        line2 = line;
        const arr = line2.split(' ').map((v) => parseInt(v));
        const [a, totalPerson] = line1.split(' ').map((v) => parseInt(v));

        // const arr = [2, 3, 4];
        // const totalPerson = 2;
        let minTime = 99999;

        function dfs(step, personNum, time) {
            if (step === arr.length && minTime > time) {
                // 任务完成
                minTime = time;
                return;
            }

            if (step >= arr.length)
                return;

            if (personNum <= 0)
                return;

            if (time > minTime)
                return;

            const remain = arr.length - step;
            for (let i = 1; i <= remain; i++) { // 给现在开发分配的需求个数
                const lastTime = calTime(time, step, i);
                dfs(step + i, personNum - 1, lastTime);
            }
        }
        // 已经消耗的时间，现在所处的任务，接下来再安排的任务
        function calTime(time, step, num) {
            for (let i = step; i < step + num; i++) {
                time += arr[i];
            }
            return time;
        }

        // 从第 0 个需求开始,已经消耗的人数，现在消耗的时间
        dfs(0, totalPerson, 0);
        print(minTime);
    }
}
