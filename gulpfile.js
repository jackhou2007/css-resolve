'use strict';

var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var minicss = require('gulp-minify-css');
var jshint = require('gulp-jshint');
var map = require('map-stream');
var clean = require('gulp-clean');

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

// default task
gulp.task('default', ['scripts', 'copy-templates'], function () {
  console.log('successfully!');
});
