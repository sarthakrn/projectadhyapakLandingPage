const gulp = require('gulp');
const pug = require('gulp-pug');
const plumber = require('gulp-plumber');
const changed = require('gulp-changed');
const gulpif = require('gulp-if');
const frontMatter = require('gulp-front-matter');
const prettify = require('gulp-prettify');
const config = require('../config');

function renderHtml(onlyChanged = false) {
    return gulp
        .src([`${config.src.templates}/[^_]*.pug`])
        .pipe(plumber({ errorHandler: config.errorHandler }))
        .pipe(gulpif(onlyChanged, changed(config.dest.html, { extension: '.html' })))
        .pipe(frontMatter({ property: 'data' }))
        .pipe(pug({
            pretty: !config.production,
            verbose: false
        }))
        .pipe(prettify({
            indent_size: 2,
            wrap_attributes: 'auto',
            preserve_newlines: true,
            end_with_newline: true
        }))
        .pipe(gulp.dest(config.dest.html));
}

function pugTask() {
    return renderHtml();
}

function pugChanged() {
    return renderHtml(true);
}

function pugWatch() {
    gulp.watch([`${config.src.templates}/**/_*.pug`], pugTask);
    gulp.watch([`${config.src.templates}/**/[^_]*.pug`], pugChanged);
}

gulp.task('pug', pugTask);
gulp.task('pug:changed', pugChanged);
gulp.task('pug:watch', pugWatch);

module.exports = {
    pugTask,
    pugChanged,
    pugWatch,
    renderHtml
};