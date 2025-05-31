const gulp = require('gulp');
const server = require('browser-sync').create();
const config = require('../config');

// Parse command line arguments
function getCliArgument(name, defaultValue = null) {
    const index = process.argv.findIndex(arg => arg === `--${name}`);
    if (index !== -1 && process.argv[index + 1]) {
        return process.argv[index + 1];
    }
    return defaultValue;
}

function hasCliFlag(name) {
    return process.argv.includes(`--${name}`);
}

function serverTask() {
    server.init({
        server: {
            baseDir: !config.production ? [config.dest.root, config.src.root] : config.dest.root,
            directory: false,
            serveStaticOptions: {
                extensions: ['html']
            }
        },
        files: [
            `${config.dest.html}/*.html`,
            `${config.dest.css}/*.css`,
            `${config.dest.img}/**/*`
        ],
        port: getCliArgument('port', 3000),
        logLevel: 'info', // 'debug', 'info', 'silent', 'warn'
        logConnections: false,
        logFileChanges: true,
        open: hasCliFlag('open'),
        notify: false,
        ghostMode: false,
        online: true,
        tunnel: getCliArgument('tunnel', null)
    });
}

gulp.task('server', serverTask);

module.exports = { serverTask, server };