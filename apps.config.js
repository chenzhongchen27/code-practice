/* eslint-disable camelcase */
module.exports = {
    apps: [{
        name: 'uron',
        script: 'npm',
        args: [
            'start',
        ],
        // ! 下面两个 log 文件配置，在使用自动部署的时候，最好配置成~目录下，如 ~/.uron_logs/，因为自动部署时会清除掉之前的目录，也就会清除掉之前的日志文件",
        error_file: './logs/app/stderr.log',
        out_file: './logs/app/stdout.log',
        pid_file: '~/.uron_fullstack_tmp/pids/app.pid',
        merge_logs: true,
        env: {
            DEBUG_COLORS: 'true',
            FORCE_COLOR: '1',
        },
    }],
};
