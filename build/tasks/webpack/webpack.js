'use strict';

const gulp = require('gulp');

const config = require('../../config');
const gutil = require('gutil');

gulp.task('webpack', function () {
  var webpack = require('webpack-stream')
  var webpackConfig = require('./webpack.prod.conf')

  var feedbackFnc = function (err, stats) {
    if (err) {
      throw new gutil.PluginError('build', err)
    }

    gutil.log('[build]', stats.toString({
      colors: true
    }))
  }

  return gulp.src(config.js.src)
    .pipe(webpack(webpackConfig.unminified, null, feedbackFnc))
    .pipe(gulp.dest(config.dest))
})
