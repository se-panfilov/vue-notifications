'use strict';

const gulp = require('gulp');

const config = require('../config');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const babel = require('gulp-babel');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const babelify = require('babelify');
const fs = require("fs");
const path = require("path");
const webpack = require('webpack-stream');
const to = require('to-case')

gulp.task('js', () => {
  return gulp.src('./src/main.js')
  // return gulp.src(config.js.src)
  //   .pipe(plumber({
  //     errorHandler: notify.onError(function (err) {
  //       return {
  //         title: 'Build JS',
  //         message: err.message
  //       };
  //     })
  //   }))
  //   .pipe(concat(config.projectName + '.js'))
  //   .pipe(rename({ basename: `${config.projectName}.es6` }))
  //   .pipe(babel({presets: ['babili']}))
  //   .pipe(rename({ basename: `${config.projectName}.es6.min` }))
  //   .pipe(gulp.dest(config.dest))
    .pipe(webpack(require('../webpack.config.js')))
    .pipe(rename({ basename: config.projectName }))
    .pipe(gulp.dest(config.dest))
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .pipe(rename({ basename: config.projectName + '.min' }))
    .pipe(gulp.dest(config.dest))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.dest))
    ;
});