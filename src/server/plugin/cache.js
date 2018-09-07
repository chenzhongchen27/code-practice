const assert = require('assert');
const debug = require('debug')('uron:server:middleware:handleCustomCode');
const util = require('util');
const LRU = require('lru-cache');

module.exports = function cache(app) {
    assert.ok(app);
    const options = {
        max: 500,
        maxAge: 1000 * 60 * 60 * 10, // 10h
    };
    app.context.cache = new LRU(options);
};
