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

gulp.task('js', () => {
  function getSrcFiles () {
    const normalizedPath = path.join(__dirname, '../../' + config.SRC);
    const arr = [];

    fs.readdirSync(normalizedPath).forEach(file => {
      console.info(normalizedPath)
      arr.push(normalizedPath + '/' + file);
    });

    return arr;
  }

  // return browserify({
  //   entries: getSrcFiles(),
  //   extensions: ['.js'],
  //   debug: true
  // })
  //   .transform(babelify)
  //   .bundle()
  //   .pipe(plumber({
  //     errorHandler: notify.onError(err => {
  //       return {
  //         title: 'Build JS',
  //         message: err.message
  //       };
  //     })
  //   }))
  //   .pipe(source('dist/' + config.projectName + '.js'))
  //   .pipe(buffer())


  // .pipe(sourcemaps.init())
  // .pipe(concat(config.projectName + '.js'))
  // .pipe(babel())
  return gulp.src(config.js.src)
    .pipe(webpack(require('../webpack.config.js')))
    .pipe(babel())
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