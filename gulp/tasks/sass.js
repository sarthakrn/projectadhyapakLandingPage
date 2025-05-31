const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const mqpacker = require('css-mqpacker');
const config = require('../config');

const processors = [
    autoprefixer({
        overrideBrowserslist: [
            'last 2 versions',
            '> 1%',
            'not dead',
            'not ie <= 11'
        ],
        cascade: false
    }),
    mqpacker({
        sort: sortMediaQueries
    })
];

function sassTask() {
    return gulp
        .src(`${config.src.sass}/*.{sass,scss}`)
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: config.production ? 'compressed' : 'expanded',
            precision: 5,
            silenceDeprecations: ['legacy-js-api']
        }))
        .on('error', config.errorHandler)
        .pipe(postcss(processors))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.dest.css));
}

function sassWatch() {
    gulp.watch(`${config.src.sass}/**/*.{sass,scss}`, sassTask);
}

function isMax(mq) {
    return /max-width/.test(mq);
}

function isMin(mq) {
    return /min-width/.test(mq);
}

function sortMediaQueries(a, b) {
    const A = a.replace(/\D/g, '');
    const B = b.replace(/\D/g, '');

    if (isMax(a) && isMax(b)) {
        return B - A;
    } 
    if (isMin(a) && isMin(b)) {
        return A - B;
    } 
    if (isMax(a) && isMin(b)) {
        return 1;
    } 
    if (isMin(a) && isMax(b)) {
        return -1;
    }

    return 1;
}

gulp.task('sass', sassTask);
gulp.task('sass:watch', sassWatch);

module.exports = { sassTask, sassWatch };