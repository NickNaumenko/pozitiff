const gulp = require('gulp');
const del = require('del');
const sass = require('gulp-sass');
const rename = require("gulp-rename");
const imagemin = require('gulp-imagemin');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync').create();
const ghPages = require('gulp-gh-pages');

const paths = {
  dirs: {
    build: './build'
  },
  html: {
    src: './src/*.html',
    dest: './build',
    watch: './src/*.html'
  },
  css: {
    src: './src/scss/main.scss',
    dest: './build/',
    watch: './src/scss/**/*.scss'
  },
  js: {
    src: './src/js/script.js',
    dest: './build/',
    watch: './src/js/**/*.js'
  },
  images: {
    src: './src/img/*',
    dest: './build/img',
    watch: ['./src/img/*']
  },
  fonts: {
    src: './src/fonts/*',
    dest: './build/fonts',
    watch: ['./src/fonts/*']
  }
};

gulp.task('clean', () => {
  return del(paths.dirs.build);
});

gulp.task('styles', () => {
  return gulp.src(paths.css.src)
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest(paths.css.dest))
    .pipe(browserSync.stream());
});

gulp.task('html', () => {
  return gulp.src(paths.html.src)
    .pipe(gulp.dest(paths.html.dest))
    .pipe(browserSync.stream());
});

gulp.task('js', () => {
  return gulp.src(paths.js.src)
    .pipe(plumber())
    .pipe(gulp.dest(paths.js.dest))
    .pipe(browserSync.stream());
})

gulp.task('images', () => {
  return gulp.src(paths.images.src)
    .pipe(plumber())
    .pipe(imagemin())
    .pipe(rename({
      dirname: ''
    }))
    .pipe(gulp.dest(paths.images.dest));
});

gulp.task('fonts', () => {
  return gulp.src(paths.fonts.src)
    .pipe(gulp.dest(paths.fonts.dest));
});

gulp.task('server', () => {
  browserSync.init({
    server: {
      baseDir: paths.dirs.build
    },
    reloadOnRestart: true,
    tunnel: 'remote'
  });
  gulp.watch(paths.css.watch, gulp.parallel('styles'));
  gulp.watch(paths.html.watch, gulp.parallel('html'));
  gulp.watch(paths.images.watch, gulp.parallel('images'));
  gulp.watch(paths.js.watch, gulp.parallel('js'));
});


gulp.task('build', gulp.series(
  'clean',
  'html',
  'styles',
  'js',
  'images',
  'fonts'
));

gulp.task('deploy', function() {
  return gulp.src('./build/**/*')
    .pipe(ghPages());
});