"use strict";

var gulp = require('gulp');
var watch = require('gulp-watch');
var rigger = require('gulp-rigger');
var rimraf = require('rimraf');
var scss = require('gulp-sass');
var plumber = require('gulp-plumber');

var path = {
        build: {
            html: 'build/',
            css: 'build/css/',
            image: 'build/images/',
            fonts: 'build/fonts/'
        },
        src: {
            html: 'src/*.html',
            scss: 'src/scss/style.scss',
            image: 'src/images/**/*.*',
            fonts: 'src/fonts/**/*.*'
        },
        watch: {
            html: 'src/**/*.html',
            scss: 'src/scss/**/*.scss',
            image: 'src/images/**/*.*',
        },
        clean: './build'
};


gulp.task('html:build', function () {
    gulp.src(path.src.html)
        .pipe(plumber())
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html));
});

gulp.task('scss:build', function () {
    gulp.src(path.src.scss)
        .pipe(plumber())
        .pipe(scss())
        .pipe(gulp.dest(path.build.css));
});


gulp.task('image:build', function () {
    gulp.src(path.src.image)
        .pipe(plumber())
        .pipe(gulp.dest(path.build.image));
});

gulp.task('fonts:build', function () {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts));
});

gulp.task('build', [
    'html:build',
    'scss:build',
    'image:build',
    'fonts:build'
]);

gulp.task('watch', function(){

    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.scss], function(event, cb) {
        gulp.start('scss:build');
    });
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('default', ['clean'], function() {
    gulp.start('build');
});