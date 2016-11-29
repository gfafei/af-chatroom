/**
 * Created by afei on 2016/11/17.
 */
var gulp = require('gulp');
var del = require('del');
var clean = require('gulp-clean');
var webpackConfig = require('./webpack.config');
var webpack = require('webpack');

gulp.task('build:clean', function () {
  return gulp.src('public')
    .pipe(clean());
});

gulp.task('build:copy',['build:clean'], function () {
  return gulp.src('web/lib/**/*')
    .pipe(gulp.dest('public/lib'));
});

gulp.task('build:webpack', function (cb) {
  webpack(webpackConfig, cb);
});

gulp.task('build', ['build:clean', 'build:copy', 'build:webpack']);

gulp.task('watch', function () {
  gulp.watch('web/**/*', ['build:js']);
});

gulp.task('dev', ['build']);

