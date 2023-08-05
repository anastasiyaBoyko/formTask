const { src, dest } = require("gulp");
const concat = require("gulp-concat");
const autoprefixer = require("gulp-autoprefixer");
const sass = require('gulp-sass')(require('sass'));
const sassGlob = require("gulp-sass-glob");
sass.compiler = require("node-sass");



function css() {
    return src("src/css/*.css")
        .pipe(concat("style.css"))
        .pipe(sassGlob())
        .pipe(
            sass({
                outputStyle: "compressed" //expand or compact or compressed
            }).on("error", sass.logError)
        )
        .pipe(
            autoprefixer({
                cascade: true
            })
        )
        .pipe(dest("build/css/"));
}


function scss() {
    return src('src/scss/style.scss') // import your all file in style.scss
        .pipe(sassGlob())
        .pipe(
            sass({
                outputStyle: 'compressed' // you can set "expand or compact or compressed" view 
            })
                .on('error', sass.logError)
        ).pipe(
            autoprefixer({
                cascade: true
            })
        ).pipe(dest('build/scss/'));
}

exports.css = css;
exports.scss= scss;