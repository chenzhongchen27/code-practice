#!/usr/bin/env node
/**
 * Parse Commands
 */
const program = require('commander');
const build = require('../lib/build');

program
    .version(require('../package').version, '-v, --version')
    .parse(process.argv);

const vusionConfig = global.vusionConfig = require('vusion-cli/config/resolve')();

build().then((d) => {
    console.info('>>> Build Success >>>');
}).catch((e) => {
    console.error('>>> Build Error >>>', e);
});
