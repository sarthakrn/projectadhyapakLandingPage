const path = require('path');
const colors = require('ansi-colors');

// Parse command line arguments for production flag
const production = process.argv.includes('--production') || process.argv.includes('--prod') || false;
const destPath = 'build';

const config = {
    env: 'development',
    production,

    src: {
        root: 'src',
        templates: 'src/templates',
        templatesData: 'src/templates/data',
        sass: 'src/sass',
        // path for sass files that will be generated automatically via some of tasks
        sassGen: 'src/sass/generated',
        js: 'src/js',
        img: 'src/img',
        svg: 'src/img/svg',
        icons: 'src/icons',
        // path to png sources for sprite:png task
        iconsPng: 'src/icons',
        // path to svg sources for sprite:svg task
        iconsSvg: 'src/icons',
        // path to svg sources for iconfont task
        iconsFont: 'src/icons',
        fonts: 'src/fonts',
        lib: 'src/lib',
    },
    dest: {
        root: destPath,
        html: destPath,
        css: path.join(destPath, 'css'),
        js: path.join(destPath, 'js'),
        img: path.join(destPath, 'img'),
        fonts: path.join(destPath, 'css', 'fonts'),
        lib: path.join(destPath, 'lib'),
    },

    setEnv(env) {
        if (typeof env !== 'string') return;
        this.env = env;
        this.production = env === 'production';
        process.env.NODE_ENV = env;
    },

    logEnv() {
        console.log(
            'Environment:',
            colors.white.bgRed(` ${process.env.NODE_ENV} `)
        );
    },

    errorHandler: require('./util/handle-errors'),
};

config.setEnv(production ? 'production' : 'development');

module.exports = config;