const gulp = require('gulp');
const config = require('../config');

function buildTask(cb) {
    config.setEnv('production');
    config.logEnv();
    return gulp.series(
        'clean',
        'sprite:svg',
        'svgo',
        gulp.parallel('sass', 'js'),
        'pug',
        'copy'
    )(cb);
}

function buildDev(cb) {
    config.setEnv('development');
    config.logEnv();
    return gulp.series(
        'clean',
        'sprite:svg',
        'svgo',
        gulp.parallel('sass', 'js'),
        'pug',
        'copy'
    )(cb);
}

gulp.task('build', buildTask);
gulp.task('build:dev', buildDev);

module.exports = { buildTask, buildDev };