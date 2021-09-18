const gulp = require('gulp');
const del = require('del');

/**
 * 清理构建目录
 */
async function clean() {
  /** 删除构建目录 */
  await del('lib');
}

async function copy() {
  await gulp.src('./src/**/*').pipe(gulp.dest('lib/'));
}

exports.default = gulp.series(clean, copy);
