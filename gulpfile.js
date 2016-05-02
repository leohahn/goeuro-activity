var gulp = require('gulp')
var connect = require('gulp-connect')
var Server = require('karma').Server
var sass = require('gulp-ruby-sass')
var autoprefixer = require('gulp-autoprefixer')

gulp.task('default', ['sass', 'test'])

gulp.task('serve', function (done) {
  connect.server({
    root: 'app'
  })
})

gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start()
})

gulp.task('test:watch', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: false
  }, done).start()
})

gulp.task('sass', function () {
  sass('app/index.scss')
    .on('error', sass.logError)
    .pipe(autoprefixer({
      browsers: [
        "Android 2.3",
        "Android >= 4",
        "Chrome >= 20",
        "Firefox >= 24",
        "Explorer >= 8",
        "iOS >= 6",
        "Opera >= 12",
        "Safari >= 6"
      ],
      cascade: false
    }))
    .pipe(gulp.dest('dist'))
})
