'use strict'

const gulp = require('gulp')
const size = require('gulp-size')

gulp.task('sizes', () => {
  return gulp.src([
    'dist/**/*.*'
  ]).pipe(size({ showFiles: true, showTotal: true }))
})