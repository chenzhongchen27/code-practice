const DBMigrate = require('db-migrate');
const assert = require('assert');

// specify an own callback, to handle errors on your side of the application.
const dbmigrate = DBMigrate.getInstance(true);
dbmigrate.silence();

Promise.resolve()
    .then(() => dbmigrate.sync('20180409023528-create-user-limit-table', '')) // 只需要写最近的日期 会自动同步到该日期 自动检测 up 还是 down
    .then(() => { console.info('db migrations done!'); });
