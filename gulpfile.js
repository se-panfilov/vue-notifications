'use strict';

const gulp = require('gulp');
const config = require('./build/config.js');
const requireDir = require('require-dir');
requireDir('./build', { recurse: true });

gulp.task('default', () => {
    gulp.start('make');
    gulp.start('todo');
    gulp.start('watch');
});

gulp.task('watch', () => {
    const watch = require('gulp-watch');
    gulp.watch(config.js.src, ['js', 'todo']);
});