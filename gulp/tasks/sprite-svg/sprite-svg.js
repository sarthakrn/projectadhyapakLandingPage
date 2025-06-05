const gulp = require('gulp');
const plumber = require('gulp-plumber');
const svgmin = require('gulp-svgmin');
const svgStore = require('gulp-svgstore');
const rename = require('gulp-rename');
const cheerio = require('gulp-cheerio');
const through2 = require('through2');
const consolidate = require('gulp-consolidate');
const config = require('../../config');

function spriteSvgTask() {
    return gulp
        .src(`${config.src.iconsSvg}/*.svg`)
        .pipe(plumber({
            errorHandler: config.errorHandler
        }))
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
        .pipe(rename({ prefix: 'icon-' }))
        .pipe(svgStore({ inlineSvg: false }))
        .pipe(through2.obj(function(file, encoding, cb) {
            const cheerioLib = require('cheerio');
            const $ = cheerioLib.load(file.contents.toString(), { xmlMode: true });
            const data = $('svg > symbol').map(function() {
                const $this = $(this);
                const viewBox = $this.attr('viewBox');
                if (!viewBox) return null;
                const size = viewBox.split(' ').slice(2);
                const name = $this.attr('id');
                const ratio = size[0] / size[1]; // symbol width / symbol height
                const fill = $this.find('[fill]:not([fill="currentColor"])').attr('fill');
                const stroke = $this.find('[stroke]').attr('stroke');
                return {
                    name,
                    ratio: +ratio.toFixed(2),
                    fill: fill || 'initial',
                    stroke: stroke || 'initial'
                };
            }).get().filter(Boolean);
            this.push(file);
            
            if (data.length > 0) {
                gulp.src(`${__dirname}/_sprite-svg.scss`)
                    .pipe(consolidate('lodash', {
                        symbols: data
                    }))
                    .pipe(gulp.dest(config.src.sassGen));
            }
            cb();
        }))
        .pipe(cheerio({
            run($, file) {
                $('[fill]:not([fill="currentColor"])').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');
            },
            parserOptions: { xmlMode: true }
        }))
        .pipe(rename({ basename: 'sprite' }))
        .pipe(gulp.dest(config.dest.img));
}

function spriteSvgWatch() {
    gulp.watch(`${config.src.iconsSvg}/*.svg`, spriteSvgTask);
}

gulp.task('sprite:svg', spriteSvgTask);
gulp.task('sprite:svg:watch', spriteSvgWatch);

module.exports = { spriteSvgTask, spriteSvgWatch };