const gulp = require('gulp');
const config = require('../config');

function watchTask() {
    return gulp.parallel(
        'copy:watch',
        'pug:watch',
        'sprite:svg:watch',
        'svgo:watch',
        'js:watch',
        'sass:watch'
    )();
}

gulp.task('watch', watchTask);

module.exports = { watchTask };