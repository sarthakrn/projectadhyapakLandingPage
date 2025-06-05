const gulp = require('gulp');
const config = require('../config.js');

function copyFonts() {
    return gulp
        .src(`${config.src.fonts}/*.{ttf,eot,woff,woff2}`)
        .pipe(gulp.dest(config.dest.fonts));
}

function copyLib() {
    return gulp
        .src(`${config.src.lib}/**/*.*`)
        .pipe(gulp.dest(config.dest.lib));
}

function copyRootFiles() {
    return gulp
        .src(`${config.src.root}/*.*`)
        .pipe(gulp.dest(config.dest.root));
}

function copyImg() {
    return gulp
        .src([
            `${config.src.img}/**/*.{jpg,png,jpeg,svg,gif}`,
            `!${config.src.img}/svgo/**/*.*`
        ])
        .pipe(gulp.dest(config.dest.img));
}

function copyTask(done) {
    return gulp.parallel(
        copyImg,
        copyFonts
        // copyRootFiles,
        // copyLib
    )(done);
}

function copyWatch() {
    gulp.watch(`${config.src.img}/**/*`, copyTask);
    gulp.watch(`${config.src.fonts}/**/*`, copyFonts);
}

gulp.task('copy:fonts', copyFonts);
gulp.task('copy:lib', copyLib);
gulp.task('copy:rootfiles', copyRootFiles);
gulp.task('copy:img', copyImg);
gulp.task('copy', copyTask);
gulp.task('copy:watch', copyWatch);

module.exports = {
    copyFonts,
    copyLib,
    copyRootFiles,
    copyImg,
    copyTask,
    copyWatch
};