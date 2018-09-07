const fs = require('fs');
const path = require('path');

const TYPES = ['app', 'api'];
const defaults = require('./defaults');

module.exports = function (relativePath = 'uron.config.js') {
    const config = defaults;

    const packagePath = path.join(process.cwd(), 'package.json');
    if (fs.existsSync(packagePath))
        Object.assign(config, require(packagePath).uron);
    const configPath = path.join(process.cwd(), relativePath);
    if (fs.existsSync(configPath))
        Object.assign(config, require(configPath));

    if (!TYPES.includes(config.type))
        throw new Error('Unknown project type!');

    return config;
};
