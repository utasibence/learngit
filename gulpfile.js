var gulp = require('gulp'),
  watch = require('gulp-watch'),
  postcss = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
  cssvars = require('postcss-simple-vars'),
  nested = require('postcss-nested'),
  cssImport = require('postcss-import'),
  mixins = require('postcss-mixins'),
  browserSync = require('browser-sync').create(),
  svgSprite = require('gulp-svg-sprite'),
  rename = require('gulp-rename'),
  del = require('del'),
  hexrgba = require('postcss-hexrgba');

function cssInject() {
  return gulp.src('./app/temp/styles/styles.css')
    .pipe(browserSync.stream());
}

function css() {
  return gulp.src('./app/assets/styles/styles.css')
    .pipe(postcss([cssImport, mixins, cssvars, nested, hexrgba, autoprefixer]))
    .pipe(gulp.dest('./app/temp/styles'));
}



function createSprite() {

  var config = {
    mode: {
      css: {
        sprite: 'sprite.svg',
        render: {
          css: {
            template: './gulp/templates/sprite.css'
          }
        }
      }
    }
  }

  console.log("2");

  return gulp.src('./app/assets/images/icons/**/*.svg')
    .pipe(svgSprite(config))
    .pipe(gulp.dest('./app/temp/sprite/'));
}

function copySpriteCSS() {
  console.log("3");
  return gulp.src('./app/temp/sprite/css/*.css')
    .pipe(rename('_sprite.css'))
    .pipe(gulp.dest('./app/assets/styles/modules'));
}

function copySpriteGraphic() {
  console.log("4");
  return gulp.src('./app/temp/sprite/css/**/*.svg')
    .pipe(gulp.dest('./app/assets/images/sprites/'));
}

function clean() {
  console.log("1");
  del(['./app/temp/sprite', './app/assets/images/sprites']);
}

gulp.task('icons', async function() {
  clean();
  createSprite();
  copySpriteCSS();
  copySpriteGraphic();
});

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
