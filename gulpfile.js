const gulp = require('gulp');
const watch = require('gulp-watch');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssvars = require('postcss-simple-vars');
const nested = require('postcss-nested');

gulp.task('default', function() {
  console.log("Gulp task");
});

function html() {
  console.log("html done");
}

function css() {
  return gulp.src('./app/assets/styles/styles.css')
    .pipe(postcss([cssvars, autoprefixer, nested]))
    .pipe(gulp.dest('./app/temp/styles'));
}

gulp.task('watch', function(){
  watch('./app/index.html', function() {
    html();
  });

  watch('./app/assets/styles/styles.css', function() {
    css();
  });
});
