'use strict';

var gulp       = require('gulp'),
    concat     = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify     = require('gulp-uglify'),
    rename     = require('gulp-rename');

gulp.task('default', function() {
    gulp.src('src/formatter.js')
        .pipe(sourcemaps.init())
        .pipe(rename('formatter.min.js'))
        .pipe(uglify({preserveComments: 'license'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist'))
    ;

    gulp.src(['src/angular-formatter.js', 'src/formatter.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('angular-formatter.min.js'))
        .pipe(uglify({preserveComments: 'license'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist'))
    ;

    gulp.src(['src/jquery-formatter.js', 'src/formatter.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('jquery-formatter.min.js'))
        .pipe(uglify({preserveComments: 'license'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist'))
    ;
});
