import gulp from 'gulp';
import watch from 'gulp-watch';
import gutil from 'gulp-util';
import scss from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import del from 'del';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import tsify from 'tsify';
import debug from 'gulp-debug';
import babel from 'gulp-babel';
import plumber from 'gulp-plumber';
import browserSync from 'browser-sync';
import rigger from 'gulp-rigger';

const reload = browserSync.reload;
const dirs = {
  src: 'src',
  dest: 'build'
};

const path = {
  build: {
    html: `${dirs.dest}/`,
    ts: `${dirs.dest}/js/`,
    css: `${dirs.dest}/css/`,
    js: `${dirs.dest}/js/`,
    img: `${dirs.dest}/images/`,
    fonts: `${dirs.dest}/fonts/`
  },
  src: {
    html: `${dirs.src}/**/*.html`,
    ts: `${dirs.src}/**/*.ts`,
    scss: `${dirs.src}/scss/style.scss`,
    js: `${dirs.src}/js/**/*.js`,
    img: `${dirs.src}/images/**/*.*`,
    fonts: `${dirs.src}/fonts/**/*.*`
  },
  watch: {
    html: `${dirs.src}/**/*.html`,
    ts: `${dirs.src}/**/*.ts`,
    scss: `${dirs.src}/scss/**/*.*`,
    js: `${dirs.src}/js/**/*.js`
  }
};

const config = {
  server: {
    baseDir: './',
    directory: true
  },
  host: 'localhost',
  port: 9002
};

gulp.task('clean', () => del([path.build.html, path.build.css]) );

gulp.task('browserify', () => {
  return browserify({
    entries: `src/main.ts`,
    debug: true
  })
  .plugin(tsify, {
    target: 'es5',
    experimentalDecorators: true
  })
  .bundle()
  .on('error', function(err) {
    gutil.log(gutil.colors.red.bold('[browserify_error]'));
    gutil.log(err.message);
    this.emit('end');
  })
  .pipe(source('bundle.js'))
  .pipe(gulp.dest(path.build.ts));
});

gulp.task('html:build', () => {
  gulp.src(path.src.html)
    .pipe(rigger())
    .pipe(gulp.dest(path.build.html))
    .pipe(reload({ stream: true }));
});

gulp.task('images:build', () => {
  gulp.src(path.src.img)
    .pipe(gulp.dest(path.build.img));
});

gulp.task('fonts:build', () => {
  gulp.src(path.src.fonts)
    .pipe(gulp.dest(path.build.fonts));
});

gulp.task('scss:build', () => {
  gulp.src(path.src.scss)
    .pipe(plumber())
    .pipe(scss())
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest(path.build.css))
    .pipe(reload({ stream: true }));
});

gulp.task('js:build', () => {
  gulp.src(path.src.js)
    .pipe(plumber())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest(path.build.js))
    .pipe(reload({ stream: true }));
});

gulp.task('webserver', () => browserSync(config) );

gulp.task('build', [
  // 'clean',
  'html:build',
  'browserify',
  'images:build',
  'fonts:build',
  'scss:build',
  'js:build'
]);

gulp.task('watch', () => {
  gulp.start('webserver');
  gulp.watch([path.watch.html], ['html:build']);
  gulp.watch([path.watch.ts], ['browserify']);
  gulp.watch([path.watch.scss], ['scss:build']);
  gulp.watch([path.watch.js], ['js:build']);

});

gulp.task('default', ['build']);
