'use strict';
var gulp        = require('gulp');
var gutil       = require('gutil');
var browserify  = require('browserify');
var stringify   = require('stringify');
var source      = require('vinyl-source-stream');
//var buffer      = require('vinyl-buffer');
var watchify    = require('watchify');
var notify      = require('gulp-notify');

var options = {
  entries: './scripts/index.js',
};
var buildPath = './scripts';

gulp.task('build', function() {
  options.debug = true;
  return browserify(options)
    .transform(stringify(['.ejs']))

    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(buildPath));
}); 

gulp.task('watch', function() {
  options.debug = true;
  var bundler = watchify(browserify(options, watchify.args));

  function rebundle() {
    return bundler.bundle()
      // log errors if they happen
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .pipe(source('bundle.js'))
      .pipe(gulp.dest(buildPath))
      .pipe(notify({ title: 'Browserify bundling', message: 'Done'}));
  }

  bundler.transform(stringify(['.ejs']));
  bundler.on('update', rebundle);
  bundler.on('log', function(msg) { console.log('log:', msg); });

  return rebundle();
});
