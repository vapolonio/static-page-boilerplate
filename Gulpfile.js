const   gulp = require('gulp')
      , winify = require('gulp-winify')
      , cssnano = require('gulp-cssnano')
      , uglify = require('gulp-uglify')
      , concat = require('gulp-concat')
      , minifyHTML = require('gulp-minify-html')
      , rename = require('gulp-rename')
      , sass = require('gulp-ruby-sass');
 
gulp.task('html', () => {
    let opts = {ssi:true};
    return gulp.src( './src/*.html' )
        .pipe( winify() )
        .pipe(minifyHTML(opts))
        .pipe( gulp.dest('./dist') ); 
});
gulp.task('css', () => {
    return gulp.src( './src/static/css/*.css' )
        .pipe( concat( './src/static/css/*.css' ) )
        .pipe( rename( 'style.min.css' ) )
        .pipe( winify({
            alphabeticSelectors: true,
            minifyIds: true}) )
        .pipe( cssnano() )
        .pipe( gulp.dest('./dist/static/css') ); 
});
gulp.task('js', () => {
    return gulp.src( './src/static/js/*.js' )
        .pipe( concat( './src/static/js/*.js' ) )
        .pipe( rename( 'script.min.js' ) )
        .pipe( uglify() )
        .pipe( gulp.dest( './dist/static/js' ) );
});
gulp.task('compile-sass', () => {
    sass('./src/static/sass/*.scss')
        .on('error', sass.logError)
        .pipe( winify({
            alphabeticSelectors: true,
            minifyIds: true}) )
        .pipe( cssnano() )
        .pipe( rename( 'style.min.css' ) )
        .pipe( gulp.dest('./dist/static/css') ); 
});
gulp.task('default', () => {
    gulp.start('html', 'css', 'js');
});
gulp.task('sass', () => {
    gulp.start('html', 'compile-sass', 'js');
});
gulp.task('generate', () => {
    gulp.start('html', 'css', 'js');
    gulp.watch('./src/*.html', (evt) => {
        gulp.start('html', 'css', 'js');
    });
    gulp.watch('./src/static/css/*.css', (evt) => {
        gulp.start('html', 'css', 'js');
    });
    gulp.watch('./src/static/js/*.js', (evt) => {
        gulp.start('html', 'css', 'js');
    });
});
gulp.task('generate-sass', () => {
    gulp.start('html', 'compile-sass', 'js');
    gulp.watch('./src/*.html', (evt) => {
        gulp.start('html', 'compile-sass', 'js');
    });
    gulp.watch('./src/static/sass/*.scss', (evt) => {
        gulp.start('html', 'compile-sass', 'js');
    });
    gulp.watch('./src/static/js/*.js', (evt) => {
        gulp.start('html', 'compile-sass', 'js');
    });
});