process.env.NODE_ENV = 'normal';

var gulp = require('gulp'),
    tinypng = require('./index'),
    cwd = __dirname,
    sigs = process.env.TINYPNG_SIGS ? true : false;

gulp.task('tinypng', function() {
    gulp.src(cwd + '/test/assets/image.png')
        .pipe(tinypng({
            key: process.env.TINYPNG_KEY || 'GGyHoR4JUDoyvdV0cNSc2dvgNdquEimE',
            log: true,
            sigFile: (sigs ? '.sigs' : false)
        }).on('error', function(err) {
            console.error(err.message);
        }))
        .pipe(gulp.dest(cwd + '/test/assets/tmp'));
});

process.env.NODE_ENV = 'test';
