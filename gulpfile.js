let gulp = require("gulp"),
  scss = require("gulp-sass"),
  browserSync = require("browser-sync"),
  del = require("del"),
  rename = require("gulp-rename"),
  concat = require("gulp-concat"),
  uglify = require("gulp-uglify"),
  autoprefixer = require("gulp-autoprefixer");

gulp.task("html", function () {
  return gulp.src("app/*.html").pipe(
    browserSync.reload({
      stream: true,
    })
  );
});

gulp.task("scss", function () {
  return gulp
    .src("app/scss/**/*.scss")
    .pipe(scss({ outputStyle: "compressed" }))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 2 versions"],
        cascade: false,
      })
    )
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(gulp.dest("app/css"))
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
});

gulp.task("js", function () {
  return gulp
    .src([
      "app/libs/jquery/dist/jquery.min.js",
      "node_modules/slick-carousel/slick/slick.js",
      "node_modules/magnific-popup/dist/jquery.magnific-popup.js",
      "node_modules/jquery-countdown/dist/jquery.countdown.js",
      "app/script/common.js",
    ])
    .pipe(concat("scripts.js"))
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest("app/js"))
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
});

gulp.task("browser-sync", function () {
  browserSync.init({
    server: {
      baseDir: "app/",
    },
  });
});

gulp.task("clean", async function () {
  del.sync("dist");
});

gulp.task("build", async function () {
  let buildHtml = gulp.src("app/*.html").pipe(gulp.dest("dist"));

  let buildCss = gulp.src("app/css/**/*.css").pipe(gulp.dest("dist/css"));

  let buildJs = gulp.src("app/js/**/*.min.js").pipe(gulp.dest("dist/js"));

  let buildImg = gulp.src("app/img/**/*.*").pipe(gulp.dest("dist/img"));
});

gulp.task("watch", function () {
  gulp.watch("app/*.html", gulp.parallel("html"));
  gulp.watch("app/scss/**/*.scss", gulp.parallel("scss"));
  gulp.watch("app/script/**/*.js", gulp.parallel("js"));
});

gulp.task("default", gulp.parallel("scss", "browser-sync", "watch"));
