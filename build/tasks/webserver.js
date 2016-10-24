"use strict"

const gulp = require('gulp')
const config = require('../config')
const connect = require('gulp-connect')

gulp.task('webserver', function () {
  return connect.server({
    root: ['./', '../mini-toastr', 'p/mini-toastr'],
    port: 8001,
    livereload: true
  })
})