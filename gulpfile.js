var gulp = require('gulp'),
    $ = require('gulp-load-plugins')({rename: {'gulp-rev-append': 'rev'}});

var pkg = require('./package.json');

var AUTOPREFIXER_BROWSERS = ["Android >= 4", "Explorer >= 10", "iOS >= 6"];

//注释信息
var banner = '/*! <%= pkg.title %> v<%= pkg.version %> by YDCSS (c) ' +
    $.util.date(Date.now(), 'UTC:yyyy') + ' Licensed <%= pkg.license %>' + ' */ \n';

gulp.task('less', function () {
    gulp.src(['src/less/ydui.less'])
        .pipe($.plumber({errorHandler: $.notify.onError('Error: <%= error.message %>')}))
        .pipe($.less())
        .pipe($.autoprefixer({
            browsers: AUTOPREFIXER_BROWSERS, cascade: false
        }))
        .pipe(gulp.dest('src/css'))
        .pipe($.livereload());
});


gulp.task('pages-less', function () {
    gulp.src(['src/less/pages/*.less'])
        .pipe($.plumber({errorHandler: $.notify.onError('Error: <%= error.message %>')}))
        .pipe($.less())
        .pipe($.autoprefixer({
            browsers: AUTOPREFIXER_BROWSERS, cascade: false
        }))
        .pipe(gulp.dest('src/css/pages'))
        .pipe($.livereload());
});
//gulp.task('concat', function () {
//    gulp.src(['src/js/source/ydui.js', 'src/js/source/**/*.js'])
//        .pipe($.concat('ydui.js'))
//        .pipe(gulp.dest('src/js'));
//});
//gulp.task('copeJs',function(){
//    gulp.src('src/js/jquery-2.1.4.min.js')
//        .pipe(gulp.dest('dist/demo/js'))
//        .pipe(gulp.dest('dist/build/js'))
//})
//
//gulp.task('copeIconfont',function(){
//    gulp.src('src/iconfont/**')
//        .pipe(gulp.dest('dist/demo/iconfont'))
//        .pipe(gulp.dest('dist/build/iconfont'))
//});
gulp.task('watch', function () {
    $.livereload.listen();
    gulp.watch('src/less/**/*.less', ['less','pages-less']);
});

//gulp.task('build:cssmin', ['less'], function () {
//    gulp.src('src/yoa_css/ydui.yoa_css')
//
//        .pipe($.cleanCss({keepSpecialComments: '*'}))
//        .pipe($.header(banner, {pkg: pkg}))
//        .pipe(gulp.dest('dist/build/yoa_css'));
//});

//gulp.task('build:uglify', function () {
//    gulp.src(['src/js/{ydui.js,ydui.flexible.js}'])
//        .pipe($.uglify())
//        .pipe($.header(banner, {pkg: pkg}))
//        .pipe(gulp.dest('dist/build/js'));
//});

//gulp.task('demo:yoa_css', function () {
//    gulp.src(['src/less/{ydui,demo}.less']).pipe($.sourcemaps.init())
//        .pipe($.less())
//        //.pipe($.cssBase64({
//        //    extensionsAllowed: ['.ttf']
//        //}))
//        .pipe($.autoprefixer({
//            browsers: AUTOPREFIXER_BROWSERS, cascade: false, remove: true
//        }))
//        .pipe($.sourcemaps.write('./'))
//        .pipe(gulp.dest('dist/demo/yoa_css'))
//        .pipe(gulp.dest('src/yoa_css'));
//});

//gulp.task('demo:html', function () {
//    gulp.src(['src/html/**/*.html', 'src/index.html', 'src/libs/**/*.html'], {base: 'src'})
//        .pipe($.rev())
//        .pipe(gulp.dest('dist/demo'));
//});
//
//gulp.task('demo:uglify', function () {
//    gulp.src(['src/js/{ydui.js,ydui.flexible.js}'])
//        .pipe(gulp.dest('dist/demo/js'));
//});

gulp.task('dev', ['less', 'pages-less','watch']);

//gulp.task('demo', ['demo:yoa_css', 'copeIconfont','copeJs','demo:uglify', 'demo:html']);

gulp.task('default', ['dev']);
