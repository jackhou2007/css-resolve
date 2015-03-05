'use strict';

var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var minicss = require('gulp-minify-css');
var jshint = require('gulp-jshint');
var map = require('map-stream');
var DEST = 'build';

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


// concat & uglify & rename javascript
gulp.task('scripts', function () {
  return gulp.src('src/**/*.js')
    .pipe(jshint())
    .pipe(myReporter)
    .pipe(gulp.dest(DEST))
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(rename({extname: '.min.js'}))
    .pipe(gulp.dest(DEST));
});

// default task
gulp.task('default', ['scripts'], function () {
  console.log('successfully!');
});
