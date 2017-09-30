var gulp = require('gulp');
var webserver = require('gulp-webserver');

gulp.task('server', function() {
    return gulp.src('./src/').pipe(webserver({
        port: process.env.PORT || 5000,
        host: process.env.HOST || "0.0.0.0",
        https: false,
        open: true
    }));
})