function build() {

    const savedEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'production';
    const compiler = require('vusion-cli/lib/build')(require('vusion-cli/webpack/' + global.vusionConfig.type));
    process.env.NODE_ENV = savedEnv || 'development';

    const promise = compiler.run();
    return promise;
}

module.exports = build;
