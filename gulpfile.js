var gulp = require('gulp')
  , changed = require('gulp-changed')
  , minifyHTML = require('gulp-minify-html')
  , rimraf = require('gulp-rimraf')
  , source = require('vinyl-source-stream')
  , browserify = require('gulp-browserify')
  , plumber = require('gulp-plumber')
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
    .pipe(gulp.dest('./public'));
});

gulp.task('scripts', function() {
  //single entry point to browserify
  gulp.src('./src/js/app.js')
    .pipe(plumber())
    .pipe(browserify({
      shim: {
        jquery : {
          path: './vendor/jquery/dist/jquery.js',
          exports: '$'
        },
        underscore: {
          path: './vendor/underscore/underscore.js',
          exports: '_'
        },
        Backbone: {
          path: './vendor/backbone/backbone.js',
          exports: 'Backbone'
        },
        Marionette: {
          path: './vendor/backbone.marionette/lib/backbone.marionette.js',
          exports: 'Marionette'
        }
      }
    }))
//    .pipe(concat('app.js'))
    .pipe(gulp.dest('./public'))
});

gulp.task('watch', function () {

  gulp.watch('./src/js/**/*.js', ['scripts']);

});



//TODO test, concat + minify js tasks
gulp.task('test', ['clean', 'jshint', 'minify-html']);
