'use strict';

var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var minicss = require('gulp-minify-css');
var jshint = require('gulp-jshint');
var map = require('map-stream');
var clean = require('gulp-clean');
var sprite = require('css-sprite').stream;
var gulpif = require('gulp-if');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var jade = require('gulp-jade');

var myReporter = map(function (file, cb) {
  if (!file.jshint.success) {
    console.log('JSHINT fail in '+file.path);
    file.jshint.results.forEach(function (err) {
      if (err) {
        console.log(' '+file.path + ': line ' + err.line + ', col ' + err.character + ', code ' + err.code + ', ' + err.reason);
      }
    });
  }
  cb(null, file);
});

// js hint
gulp.task('jshint', function () {
  return gulp.src('js/**/*.js')
    .pipe(jshint())
    .pipe(myReporter);
});

// clean file
gulp.task('clean-scripts', function () {
  return gulp.src('build/js/**/*.js', {read: false})
    .pipe(clean());
});

// transpart template
gulp.task('templates', function () {
  return gulp.src('src/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('build'));
});

// copy template
gulp.task('copy-templates', function () {
  return gulp.src('src/index.html')
    .pipe(gulp.dest('build'));
});

// concat & uglify & rename javascript
gulp.task('scripts', ['clean-scripts', 'jshint'], function () {
  return gulp.src(['src/js/app/*.js', 'src/js/helper/*.js'])
    .pipe(gulp.dest('build/js'))
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(rename({extname: '.min.js'}))
    .pipe(gulp.dest('build/js'));
});

// transition sass file to css file
gulp.task('sass',['sprites'], function () {
  return gulp.src('src/scss/*.scss')
      .pipe(sass())
      .pipe(gulp.dest('./css'));
});

// css sprite
// generate sprite.png and _sprite.scss
gulp.task('sprites', function () {
  return gulp.src('./src/img/icons/**/*.png')
    .pipe(sprite({
      name: 'sprite',
      style: '_sprite.scss',
      cssPath: './img',
      processor: 'scss'
    }))
    .pipe(gulpif('*.png', gulp.dest('src/img/'), gulp.dest('src/scss/')))
});

// generate scss with base64 encoded images
gulp.task('base64', function () {
  return gulp.src('./src/img/icons/**/*.png')
    .pipe(sprite({
      base64: true,
      style: '_base64.scss',
      processor: 'scss'
    }))
    .pipe(gulp.dest('./build/scss/'));
});

// serve
gulp.task('serve', function () {
  browserSync({
    server: {
      baseDir: 'src'
    }
  });

  gulp.watch(['*.html', 'css/**/*.css', 'js/**/*.js'], {cwd: 'src'}, reload);
});

// default task
gulp.task('default', ['scripts', 'copy-templates'], function () {
  console.log('successfully!');
});
