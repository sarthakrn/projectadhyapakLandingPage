const gulp = require('gulp');
const include = require('gulp-include');
const babel = require('gulp-babel');
const browserSync = require('browser-sync');
const config = require('../config');

const reload = browserSync.reload;

function jsTask() {
    return gulp
        .src(`${config.src.js}/**/*.js`)
        .pipe(include())
        .on('error', config.errorHandler)
        .pipe(babel())
        .on('error', config.errorHandler)
        .pipe(gulp.dest(`${config.dest.js}/`))
        .pipe(reload({ stream: true }));
}

function jsWatch() {
    gulp.watch(`${config.src.js}/**/*.js`, jsTask);
}

gulp.task('js', jsTask);
gulp.task('js:watch', jsWatch);

module.exports = { jsTask, jsWatch };