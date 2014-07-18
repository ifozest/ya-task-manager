var gulp = require('gulp')
  , changed = require('gulp-changed')
  , minifyHTML = require('gulp-minify-html')
  , rimraf = require('gulp-rimraf')
  , source = require('vinyl-source-stream')
  , browserify = require('browserify')
  , handlebars = require('gulp-handlebars')
  , defineModule = require('gulp-define-module')
  , replace = require('gulp-replace')
  , concat = require('gulp-concat')
  , jshint = require('gulp-jshint');


gulp.task('jshint', function () {
  gulp.src('./src/js/**/*.js', {lookup: false})
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'))
    .on('error', function (err) {
      console.error(err.message);
      this.emit('end');
    });
});

gulp.task('minify-html', function () {
  var htmlSrc = './src/**/*.html'
    , htmlDest = './public';

  gulp.src(htmlSrc)
    .pipe(changed(htmlDest))
    .pipe(minifyHTML())
    .pipe(gulp.dest(htmlDest));
});

/**
 * removes public folder
 */
gulp.task('clean', function () {
  gulp.src('./public', {read: false})
    .pipe(rimraf());
});

gulp.task('copy', function () {
  gulp.src('./src/**/*.html')
    .pipe(changed('./public'))
    .pipe(gulp.dest('./public'));
});

gulp.task('browserify', function () {
  var bundle = browserify('./src/js/app.js');

  return bundle.bundle({debug: true})
    .on('error', function (err) {
      console.log(err.toString());
      this.emit('end');
    })
    .pipe(source('app.js'))
    .pipe(gulp.dest('./public/'));
});

gulp.task('handlebars', function () {
  gulp.src(['./src/templates/**/*.hbs'])
    .pipe(handlebars())
    .pipe(defineModule('commonjs'))
    .pipe(replace(/require\(["']handlebars["']\)/, 'require("handlebars")["default"]'))
    .pipe(gulp.dest('./src/templates'));
});

gulp.task('watch', function () {
  gulp.watch('src/templates/**/*.hbs', ['handlebars']);
  gulp.watch('src/**/*.js', ['browserify']);
  gulp.watch('src/**/*.html', ['copy']);
});


//TODO test, concat + minify js tasks
gulp.task('test', ['clean', 'jshint', 'minify-html']);
