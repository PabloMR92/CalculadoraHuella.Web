var gulp = require('gulp');
var webserver = require('gulp-webserver');

gulp.task('server', function() {
    return gulp.src('./dist/').pipe(webserver({
        host: '0.0.0.0',
        port: process.env.PORT || 5000,
        https: false,
        open: true
    }));
});