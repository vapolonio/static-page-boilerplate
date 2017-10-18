const   gulp = require('gulp')
      , winify = require('gulp-winify')
      , cssnano = require('gulp-cssnano')
      , uglify = require('gulp-uglify')
      , concat = require('gulp-concat')
      , minifyHTML = require('gulp-minify-html')
      , rename = require('gulp-rename')
      , sass = require('gulp-ruby-sass')
      , fileinclude = require('gulp-file-include')
      , runSequence = require('run-sequence');
 
gulp.task('fileInclude', () => {
    return gulp.src('./src/*.html')
        .pipe( fileinclude({
        prefix: '@@',
        basepath: '@file'
    }))
    .pipe( gulp.dest('./.temp') );
});
gulp.task('compile-html', () => {
    return gulp.src( './.temp/*.html' )
        .pipe( minifyHTML() )
        .pipe( gulp.dest( './dist' ) ); 
});

gulp.task( 'compile-sass', () => {
    return sass( './src/static/sass/*.scss' )
        .on( 'error', sass.logError )
        .pipe( cssnano() )
        .pipe( rename( 'style-sass.min.css' ) )
        .pipe( gulp.dest( './.temp/css' ) ); 
});
gulp.task( 'compile-css', () => {
    return gulp.src( './src/static/css/*.css' )
        .on( 'error', sass.logError )
        .pipe( cssnano() )
        .pipe( rename( 'style-css.min.css' ) )
        .pipe( gulp.dest( './.temp/css' ) ); 
});
gulp.task( 'generate-css', () => {
    return gulp.src( './.temp/css/*.css' )
    .pipe( concat( './.temp/css/*.css' ) )
    .pipe( rename( 'style.min.css' ) )
    .pipe( cssnano() )
    .pipe( gulp.dest('./dist/static/css') );
});

gulp.task('css', () => {
    runSequence('compile-sass', 'compile-css', 'generate-css');
});
gulp.task('js', () => {
    return gulp.src( './src/static/js/*.js' )
        .pipe( concat( './src/static/js/*.js' ) )
        .pipe( rename( 'script.min.js' ) )
        .pipe( uglify() )
        .pipe( gulp.dest( './dist/static/js' ) );
});
gulp.task('html', () => {
    runSequence('fileInclude', 'compile-html');
})

gulp.task('lib-js', () => {
    return gulp.src('./src/static/lib/js/*.js')
    .pipe(gulp.dest( './dist/static/lib/js' ));
})
gulp.task('lib-css', () => {
    return gulp.src('./src/static/lib/css/*.css')
    .pipe(gulp.dest( './dist/static/lib/css' ));
})
gulp.task('img', () => {
    return gulp.src('./src/static/img/*')
    .pipe(gulp.dest( './dist/static/img' ));
})

gulp.task('default', () => {
    gulp.start('css', 'js', 'html', 'lib-js', 'lib-css', 'img');
});

gulp.task('generate', () => {
    gulp.start('css', 'js', 'html', 'lib-js', 'lib-css', 'img');
    gulp.watch('./src/*.html', (evt) => {
        gulp.start('css', 'js', 'html', 'lib-js', 'lib-css', 'img');
    });
    gulp.watch('./src/include/*.html', (evt) => {
        gulp.start('css', 'js', 'html', 'lib-js', 'lib-css', 'img');
    });
    gulp.watch('./src/static/css/*.css', (evt) => {
        gulp.start('css', 'js', 'html', 'lib-js', 'lib-css', 'img');
    });
    gulp.watch('./src/static/sass/*.scss', (evt) => {
        gulp.start('css', 'js', 'html', 'lib-js', 'lib-css', 'img');
    });
    gulp.watch('./src/static/js/*.js', (evt) => {
        gulp.start('css', 'js', 'html', 'lib-js', 'lib-css', 'img');
    });
});