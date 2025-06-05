const gulp = require('gulp');
const { deleteAsync } = require('del');
const colors = require('ansi-colors');
const config = require('../config');

function cleanTask() {
    return deleteAsync([
        config.dest.root
    ]).then((paths) => {
        if (paths.length > 0) {
            console.log('Deleted:', colors.magenta(paths.join('\n')));
        }
    });
}

gulp.task('clean', cleanTask);

module.exports = { cleanTask };