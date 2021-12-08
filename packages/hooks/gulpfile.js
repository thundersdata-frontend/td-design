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

  return tsProject.src().pipe(tsProject()).pipe(gulp.dest('lib/commonjs/'));
}

/**
 * 构建esm模块
 * @returns
 */
function buildES() {
  const tsProject = ts.createProject('tsconfig.build.json', {
    module: 'ESNext',
  });
  return tsProject.src().pipe(tsProject()).pipe(gulp.dest('lib/module/'));
}

/**
 * 生成类型声明文件
 * @returns
 */
function buildDeclaration() {
  const tsProject = ts.createProject('tsconfig.build.json', {
    declaration: true,
    emitDeclarationOnly: true,
    removeComments: false,
  });
  return tsProject.src().pipe(tsProject()).pipe(gulp.dest('lib/typescript/'));
  // const tsResult = tsProject.src().pipe(tsProject());
  // return tsResult.dts.pipe(replace('/***/', '/// <reference path="./type.d.ts" />')).pipe(gulp.dest('lib/typescript/'));
}

/**
 * 复制type.d.ts
 */
function copyDeclaration() {
  return gulp.src('./type.d.ts').pipe(gulp.dest('lib/typescript/'));
}

exports.default = gulp.series(
  clean,
  buildCJS,
  buildES,
  //copyDeclaration,
  buildDeclaration
);
