require('module-alias/register');

const result = require('dotenv').config();

if (result.error) { throw new Error(result.error, 'dotevn parse error'); } else { console.info('dotevn parsed envs:  %O', result.parsed); }
process.env.HOSTNAME = result.parsed.HOSTNAME;

const config = require('config');
console.log('HOSTNAME: %s', config.util.getEnv('HOSTNAME'));
console.log('config %O', config);

module.exports = config;
