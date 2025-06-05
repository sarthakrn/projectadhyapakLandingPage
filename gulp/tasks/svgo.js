const gulp = require('gulp');
const svgmin = require('gulp-svgmin');
const changed = require('gulp-changed');
const plumber = require('gulp-plumber');
const config = require('../config');

function svgoTask() {
    return gulp
        .src(`${config.src.img}/svgo/**/*.svg`)
        .pipe(plumber({
            errorHandler: config.errorHandler
        }))
        .pipe(changed(config.dest.img))
        .pipe(svgmin({
            js2svg: {
                pretty: true
            },
            plugins: [{
                name: 'removeDesc',
                active: true
            }, {
                name: 'cleanupIDs',
                active: true
            }, {
                name: 'mergePaths',
                active: false
            }]
        }))
        .pipe(gulp.dest(config.dest.img));
}

function svgoWatch() {
    gulp.watch(`${config.src.img}/svgo/**/*.svg`, svgoTask);
}

gulp.task('svgo', svgoTask);
gulp.task('svgo:watch', svgoWatch);

module.exports = { svgoTask, svgoWatch };