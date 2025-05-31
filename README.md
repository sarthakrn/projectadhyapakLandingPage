# Adhyapak Landing Page

A modern, responsive landing page built with Gulp 4, Sass, Pug templates, and ES2024+ JavaScript.

## Prerequisites

- Node.js 18+ 
- npm 9+

## Quick Start

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start development server:
   ```bash
   npm start
   ```
4. Build for production:
   ```bash
   npm run build
   ```

## Development

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server with live reload |
| `npm run build` | Build production-ready assets |
| `npm run lint` | Run ESLint on JavaScript files |
| `npm run lint-fix` | Fix auto-fixable ESLint issues |

### Gulp Tasks

Run individual tasks with `gulp [task_name]`:

| Task | Description |
|------|-------------|
| `default` | Development mode: build, watch, and serve |
| `build` | Production build with optimizations |
| `build:dev` | Development build without optimizations |
| `sass` | Compile Sass to CSS with PostCSS |
| `js` | Transpile JavaScript with Babel |
| `pug` | Compile Pug templates to HTML |
| `copy` | Copy static assets |
| `sprite:svg` | Generate SVG sprite and Sass mixins |
| `svgo` | Optimize SVG files |
| `clean` | Remove build directory |
| `server` | Start BrowserSync development server |

## Project Structure

```
src/
├── sass/           # Sass stylesheets
├── js/             # JavaScript modules
├── templates/      # Pug templates
├── img/            # Images and SVG files
├── icons/          # SVG icons for sprite generation
└── fonts/          # Web fonts

build/              # Generated production files
gulp/
├── tasks/          # Individual Gulp tasks
├── config.js       # Build configuration
└── util/           # Utility functions
```

## Features

- **Modern Build System**: Gulp 4 with ES2024+ support
- **CSS Processing**: Sass compilation with PostCSS, Autoprefixer, and CSS optimization
- **JavaScript**: Babel transpilation with modern preset-env configuration
- **Templates**: Pug template engine with front matter support
- **Assets**: SVG sprite generation, image optimization
- **Development**: Live reload, source maps, error handling
- **Code Quality**: ESLint with Airbnb configuration, Stylelint for CSS

## Browser Support

- Last 2 versions of major browsers
- \> 1% market share
- Not dead browsers
- No Internet Explorer support

## Server Options

### Development Server

The development server supports several command-line flags:

- `gulp server --open` - Open browser automatically
- `gulp server --port 8080` - Use custom port
- `gulp server --tunnel mysite` - Create public tunnel via localtunnel.me

### BrowserSync Features

- Live reload on file changes
- Synchronized browsing across devices
- Built-in development server
- Network access for mobile testing

## Build Optimization

Production builds include:

- CSS minification and optimization
- JavaScript transpilation and optimization  
- SVG optimization
- Asset copying and organization
- Source map generation

## Code Quality

### ESLint

- Airbnb JavaScript style guide
- ES2024+ syntax support
- Automatic code formatting rules
- Import/export validation

### Stylelint

- SCSS/Sass support
- Property ordering
- BEM methodology validation
- Modern CSS best practices

## Deployment

### GitHub Pages

Deploy to GitHub Pages:

```bash
npm run ghpages
```

This pushes only the `build/` directory to the `gh-pages` branch.

### Manual Deployment

1. Run production build: `npm run build`
2. Deploy contents of `build/` directory to your hosting service

## Dependencies

### Core Build Tools

- **Gulp 4**: Modern build automation
- **Sass**: CSS preprocessing with Dart Sass
- **Babel 7**: JavaScript transpilation
- **PostCSS**: CSS post-processing
- **BrowserSync**: Development server

### Code Quality

- **ESLint 8**: JavaScript linting
- **Stylelint 16**: CSS/Sass linting
- **Prettier**: Code formatting

## Contributing

1. Follow the established code style
2. Run linting before committing: `npm run lint`
3. Test builds locally: `npm run build`
4. Follow conventional commit messages

## License

This project is licensed under the MIT License.