/**
 * 数据库连接
 */

'use strict';

const config = require('config');
const logger = require('@s-utils/logger');

const log = logger.createLogger('myRn:src:server:model:db');
const dbConfig = config.db;
// db
const knex = require('knex')({
    client: 'mysql2',
    connection: {
        host: dbConfig.host,
        database: dbConfig.database,
        user: dbConfig.user,
        password: dbConfig.password,
        charset: 'utf8',
    },
    pool: {
        min: 0,
        max: dbConfig.poolSize || 10,
    },
    debug: true,
});

log.info(`数据库连接：connect to ${dbConfig.host}#${dbConfig.database}`);

const db = require('bookshelf')(knex);
db.plugin('pagination');
db.plugin('registry');

module.exports = db;
