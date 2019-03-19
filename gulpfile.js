/* global require */
var gulp = require('gulp');
var connect = require('gulp-connect');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var templateCache = require('gulp-angular-templatecache');
var streamqueue = require('streamqueue');
var fs = require('fs');

gulp.task('connect', function _connect(done) {
    connect.server({
        root: ['demo', './'],
        livereload: true,
    });

    done();
});

gulp.task('minify', function _minify() {
    var files = JSON.parse(fs.readFileSync('sources.json', 'utf-8'));
    var stream = streamqueue({
                objectMode: true
            },
            gulp.src(files),
            gulp.src(['src/templates/**/*.html']).pipe(templateCache({
                module: 'schemaFormPanel',
                root: 'src/templates/',
            }))
        )
        .pipe(concat('angular-schema-form-panel.js'))
        .pipe(gulp.dest('./dist'))
        .pipe(uglify())
        .pipe(rename('angular-schema-form-panel.min.js'))
        .pipe(gulp.dest('./dist'));

    return stream;
});

gulp.task('reload', gulp.series('minify', function _reload() {
    return gulp.src('./dist/**/*.*').pipe(connect.reload());
}));

gulp.task('watch', function _watch(done) {
    gulp.watch(['./src/**/*.*', './demo/**/*.*'], gulp.task('reload'));

    done();
});

gulp.task('default', gulp.parallel('minify', 'connect', 'watch'));
