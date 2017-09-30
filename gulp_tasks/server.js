var gulp = require('gulp');
var webserver = require('gulp-webserver');

gulp.task('server', function() {
    return gulp.src('./dist/').pipe(webserver({
        port: process.env.PORT || 5000,
        https: false,
        open: true
    }));
})