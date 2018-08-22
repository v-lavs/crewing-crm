var gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    plumber = require('gulp-plumber'),
    autoprefixer = require('gulp-autoprefixer'),
    watch = require('gulp-watch'),
    notify = require('gulp-notify'),
    sass = require('gulp-sass'),
    gcmq = require('gulp-group-css-media-queries'),
    cssmin = require('gulp-cssmin');

var config = {
    sourceMaps: true,
    sassOptions: {
        errLogToConsole: true,
        precision: 4,
        noCache: true,
    }
};

// Default error handler
var onError = function (err) {
    console.log('An error occured:', err.message);
    this.emit('end');
};

gulp.task('sass', function () {
    return gulp.src('./assets/scss/main.scss')
        .pipe(plumber({errorHandler: onError}))
        .pipe(sourcemaps.init())
        .pipe(sass(config.sassOptions))
        .pipe(sourcemaps.write('./map'))
        .pipe(gulp.dest('./assets/css'))
        .pipe(notify({title: 'Styles', message: 'update successfully'}));
});

gulp.task('sass:build', function () {
    return gulp.src('./assets/scss/main.scss')
        .pipe(plumber({errorHandler: onError}))
        .pipe(sass(config.sassOptions))
        .pipe(autoprefixer({
            browsers: ['last 6 version', '> 0.2%', 'ie 9']
        }))
        .pipe(gcmq())
        .pipe(cssmin())
        .pipe(gulp.dest('./assets/css'))
        .pipe(notify({title: 'Styles', message: 'build successfully'}));
});

// watch files for change
gulp.task('watch', ['sass'], function () {
    gulp.watch('./assets/scss/**/*.scss', ['sass']);
});

gulp.task('build', ['sass:build'], function () {
});

gulp.task('default', ['sass'], function () {
});