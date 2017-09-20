const gulp = require('gulp')

const config = require('../config')
const sourcemaps = require('gulp-sourcemaps')
const uglify = require('gulp-uglify')
const concat = require('gulp-concat')
const rename = require('gulp-rename')
const notify = require('gulp-notify')
const plumber = require('gulp-plumber')
const babel = require('gulp-babel')
const umd = require('gulp-umd')
const to = require('to-case')
const stripCode = require('gulp-strip-code')

gulp.task('es5', () => {
  return gulp.src(config.js.src)
    .pipe(plumber({
      errorHandler: notify.onError(err => {
        return {
          title: 'Build ES5',
          message: err.message || err
        }
      })
    }))
    .pipe(concat(`${config.projectName}.es5.js`))
    .pipe(stripCode({
      start_comment: 'START.TESTS_ONLY',
      end_comment: 'END.TESTS_ONLY'
    }))
    .pipe(babel({comments: false}))
    .pipe(umd({
      exports: function (file) {
        return to.pascal(config.projectName)
      },
      namespace: function (file) {
        return to.pascal(config.projectName)
      }
    }))
    .pipe(gulp.dest(config.dest))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(rename({basename: config.projectName + '.es5.min'}))
    .pipe(gulp.dest(config.dest))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.dest))
})