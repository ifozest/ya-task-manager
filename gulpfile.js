var gulp = require('gulp')
  , changed = require('gulp-changed')
  , minifyHTML = require('gulp-minify-html')
  , del = require('del')
  , source = require('vinyl-source-stream')
  , browserify = require('browserify')
  , handlebars = require('gulp-handlebars')
  , defineModule = require('gulp-define-module')
  , replace = require('gulp-replace')
  , webserver = require('gulp-webserver')
  , jshint = require('gulp-jshint');

var paths = {
  dest: 'public',
  htmlSrc: 'src/**/*.html',
  jshintrc: '.jshintrc',
  jsSrc: 'src/js/**/*.js',
  templatesHbsSrc: 'src/js/**/*.hbs',
  templatesJsSrc: 'src/js/**/template/**/*.js',
  templatesDest: 'src/js'
};


gulp.task('jshint', function () {
  gulp.src(paths.jsSrc)
    .pipe(jshint(paths.jshintrc))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'))
    .on('error', function (err) {
      console.error(err.message);
      this.emit('end');
//      process.exit(1);
    });
});

gulp.task('minify-html', function () {
  gulp.src(paths.htmlSrc)
    .pipe(changed(paths.dest))
    .pipe(minifyHTML())
    .pipe(gulp.dest(paths.dest));
});

/**
 * removes public folder
 */
gulp.task('clean', function () {
  del.sync(paths.dest, {force: true});
});

gulp.task('copy', function () {
  gulp.src(paths.htmlSrc)
    .pipe(changed(paths.dest))
    .pipe(gulp.dest(paths.dest));
});

//Bootstrap things, rename or replace or refactor
gulp.task('css:bootstrap', function () {
  gulp.src('node_modules/bootstrap/dist/css/bootstrap.min.css')
    .pipe(gulp.dest('public/css'));
});

gulp.task('js:bootstrap', function () {
  gulp.src('node_modules/bootstrap/dist/js/bootstrap.min.js')
    .pipe(gulp.dest('public/js'));
});

gulp.task('fonts:bootstrap', function () {
  gulp.src('node_modules/bootstrap/fonts/**')
    .pipe(gulp.dest('public/fonts'));
});



gulp.task('browserify', function () {
  var bundle = browserify('./src/js/app.js');

  return bundle.bundle({debug: true})
    .on('error', function (err) {
      console.log(err.toString());
      this.emit('end');
    })
    .pipe(source('js/app.js'))
    .pipe(gulp.dest(paths.dest));
});

gulp.task('handlebars', function () {
  gulp.src(paths.templatesHbsSrc)
    .pipe(handlebars())
    .pipe(defineModule('commonjs'))
    .pipe(replace(/require\(["']handlebars["']\)/, 'require("handlebars")["default"]'))
    .pipe(gulp.dest(paths.templatesDest));
});

gulp.task('server', function () {
  gulp.src('public')
    .pipe(webserver({
      livereload: true,
      port: 8000
    }));
});

gulp.task('watch', function () {
  gulp.watch([paths.templatesHbsSrc], ['handlebars']);
  gulp.watch([paths.jsSrc], ['browserify']);
  gulp.watch([paths.htmlSrc], ['copy']);
});

gulp.task('start-dev', ['clean', 'handlebars', 'copy', 'bootstrap', 'browserify', 'watch']);

gulp.task('bootstrap', ['css:bootstrap', 'js:bootstrap', 'fonts:bootstrap']);

//TODO test, concat + minify js tasks
gulp.task('test', ['clean', 'jshint', 'handlebars', 'browserify']);