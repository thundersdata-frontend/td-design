const gulp = require('gulp');
const del = require('del');
const ts = require('gulp-typescript');

/**
 * 清理构建目录
 */
async function clean() {
  /** 删除构建目录 */
  await del('lib');
}

/** 编译成 commonjs */
async function buildCJS() {
  const tsProject = ts.createProject('tsconfig.build.json', {
    module: 'CommonJS',
  });

  await tsProject.src().pipe(tsProject()).pipe(gulp.dest('lib/commonjs/'));
  return gulp.src(['src/**/assets/*', 'src/**/*.less', 'src/**/*.otf']).pipe(gulp.dest('lib/commonjs/'));
}

/** 编译成 module */
async function buildES() {
  const tsProject = ts.createProject('tsconfig.build.json', {
    module: 'ESNext',
  });
  await tsProject.src().pipe(tsProject()).pipe(gulp.dest('lib/module/'));
  return gulp.src(['src/**/assets/*', 'src/**/*.less', 'src/**/*.otf']).pipe(gulp.dest('lib/module/'));
}

/** 编译成 .d.ts */
async function buildDeclaration() {
  const tsProject = ts.createProject('tsconfig.build.json', {
    declaration: true,
    emitDeclarationOnly: true,
  });
  return tsProject.src().pipe(tsProject()).pipe(gulp.dest('lib/typescript/'));
}

exports.default = gulp.series(clean, buildCJS, buildES, buildDeclaration);
