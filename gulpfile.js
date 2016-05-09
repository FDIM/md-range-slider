"use strict";
var fs = require('fs');
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var coveralls = require('gulp-coveralls');
var cssmin = require('gulp-cssmin');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var karma = require('karma').server;
var tag_version = require('gulp-tag-version');

var _package = JSON.parse(fs.readFileSync('./package.json'));
var _coverage = 'coverage/**/lcov.info';
var _scripts = 'src/**/*.js';
var _styles = 'src/**/*.css';
var _dist = 'dist';
var _script = _package.main.replace(_dist+'/','');
var _style = _package.main.replace(_dist+'/','').replace('.js','.css');
var _browsers = ["PhantomJS"];

gulp.task('build-css', function () {
  return gulp.src(_styles)
    .pipe(concat(_style.toLowerCase()))
    .pipe(gulp.dest(_dist))
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(_dist));
});

gulp.task('build', ['unit-test', 'build-css'], function () {
  return gulp.src(_scripts)
    .pipe(concat(_script.toLowerCase()))
    .pipe(gulp.dest(_dist))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(_dist));
});

gulp.task('unit-test', function (done) {
  var _opts = {
    configFile: __dirname + '/karma.conf.js',
    singleRun: true,
    browsers: _browsers
  };

  karma.start(_opts, done);
});

gulp.task('coverage', ['unit-test'], function () {
  gulp
    .src(_coverage)
    .pipe(coveralls());
});

// tag the last commit
gulp.task('tag', function() {
  return gulp.src(['./package.json']).pipe(tag_version());
});
