var gulp = require('gulp'),
watch = require('gulp-watch'),
postcss = require('gulp-postcss'),
autoprefixer = require('autoprefixer'),
cssvars = require('postcss-simple-vars'),
nested = require('postcss-nested'),
cssImport = require('postcss-import'),
mixins = require('postcss-mixins'),
browserSync = require('browser-sync').create();

function cssInject() {
  return gulp.src('./app/temp/styles/styles.css')
    .pipe(browserSync.stream());
}

function css() {
  return gulp.src('./app/assets/styles/styles.css')
    .pipe(postcss([cssImport, mixins, cssvars, nested, autoprefixer]))
    .pipe(gulp.dest('./app/temp/styles'));
}

gulp.task('watch', function() {

  browserSync.init({
    notify: false,
    server: {
      baseDir: "app"
    }
  });

  watch('./app/assets/styles/**/*.css', function() {
    css();
    cssInject();

  });

  watch('./app/index.html', function() {
    browserSync.reload();
  });
});
