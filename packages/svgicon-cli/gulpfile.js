const gulp = require('gulp');
const del = require('del');
const replace = require('gulp-replace');
const ts = require('gulp-typescript');

/**
 * 清理构建目录
 */
function clean() {
  /** 删除构建目录 */
  return del('lib');
}

/**
 * 构建cjs模块
 * @returns
 */
function buildCJS() {
  const tsProject = ts.createProject('tsconfig.build.json', {
    module: 'CommonJS',
  });

  return tsProject.src().pipe(tsProject()).pipe(gulp.dest('lib/'));
}

/**
 * 复制模板
 */
function copyTemplate() {
  return gulp.src('./src/templates/**/*').pipe(gulp.dest('lib/templates'));
}

function copyJson() {
  return gulp.src('./svgicon.json').pipe(gulp.dest('lib/libs'));
}

exports.default = gulp.series(clean, buildCJS, copyTemplate, copyJson);
