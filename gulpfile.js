'use strict';
var gulp        = require('gulp');
var browserify  = require('browserify');
var stringify   = require('stringify');
var source      = require('vinyl-source-stream');
//var buffer      = require('vinyl-buffer');

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
