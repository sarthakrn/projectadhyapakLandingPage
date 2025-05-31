const notify = require('gulp-notify');
const colors = require('ansi-colors');

module.exports = function handleErrors() {
    const args = Array.prototype.slice.call(arguments);
    
    // Log error to console with colors
    console.error(colors.red('Build Error:'), args[0].message || args[0]);
    
    // Show desktop notification
    notify.onError({
        title: 'Build Error',
        message: '<%= error.message %>',
        sound: 'Submarine'
    }).apply(this, args);
    
    // Prevent the 'watch' task from stopping
    this.emit('end');
};