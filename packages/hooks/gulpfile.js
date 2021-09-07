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

async function buildCJS() {
  const tsProject = ts.createProject('tsconfig.build.json', {
    module: 'CommonJS',
  });

  return tsProject.src().pipe(tsProject()).pipe(gulp.dest('lib/commonjs/'));
}

async function buildES() {
  const tsProject = ts.createProject('tsconfig.build.json', {
    module: 'ESNext',
  });
  return tsProject.src().pipe(tsProject()).pipe(gulp.dest('lib/module/'));
}

async function buildDeclaration() {
  const tsProject = ts.createProject('tsconfig.build.json', {
    declaration: true,
    emitDeclarationOnly: true,
  });
  return tsProject.src().pipe(tsProject()).pipe(gulp.dest('lib/typescript/'));
}

async function copyDeclaration() {
  await gulp.src('./type.d.ts').pipe(gulp.dest('lib/typescript/'));
}

exports.default = gulp.series(clean, buildCJS, buildES, buildDeclaration, copyDeclaration);
