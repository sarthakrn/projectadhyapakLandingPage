const gulp = require('gulp');
const config = require('../config');

function defaultTask() {
    return gulp.series(
        'build:dev',
        gulp.parallel('watch', 'server')
    )();
}

gulp.task('default', defaultTask);

module.exports = { defaultTask };