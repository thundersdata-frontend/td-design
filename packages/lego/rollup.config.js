const commonjs = require('@rollup/plugin-commonjs');
const image = require('@rollup/plugin-image');
const resolve = require('@rollup/plugin-node-resolve');
const postcss = require('rollup-plugin-postcss');
const less = require('less');
const typescript = require('rollup-plugin-typescript2');
const fs = require("fs")

const isProductionEnv = process.env.NODE_ENV === 'production';

const noDeclarationFiles = { compilerOptions: { declaration: false } };

let pkg = JSON.parse(fs.readFileSync('./package.json')),
    external = Object.keys(pkg.dependencies || {});

const processLess = function (context, payload) {
  return new Promise((resolve, reject) => {
    less.render(
      {
        file: context,
      },
      function (err, result) {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    );

    less.render(context, {}).then(
      function (output) {
        if (output && output.css) {
          resolve(output.css);
        } else {
          reject({});
        }
      },
      function (err) {
        reject(err);
      }
    );
  });
};



module.exports = [
  {
    input: ['./src/index.tsx'],
    output: {
      dir: 'lib/commonjs',
      format: 'cjs',
      name: '[name].js',
      preserveModules: true,
      preserveModulesRoot: 'src',
      // entryFileNames: entryFileNames
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript({
        tsconfig: 'tsconfig.json',
        tsconfigOverride: { compilerOptions: { declaration: true, declarationDir: './lib/typescript' } },
        useTsconfigDeclarationDir: true,
      }),
      image(),
      postcss({
        minimize: isProductionEnv,
        process: processLess,
      }),
    ],
    external: ['react', 'react-dom',...external,/node_modules/],
  },
  {
    input: ['./src/index.tsx'],
    output: {
      dir: 'lib/module',
      format: 'esm',
      entryFileNames: '[name].js',
      preserveModules: true,
      preserveModulesRoot: 'src',
    },
    plugins: [
      resolve(),
      commonjs({
        mainFields: ['module', 'main', 'jsnext:main', 'browser'],
        extensions: ['.js', '.mjs', '.json'],
        sourceMap: false,
        browser: true,
      }),
      typescript({ tsconfigOverride: noDeclarationFiles }),
      image(),
      postcss({
        minimize: isProductionEnv,
        process: processLess,
      }),
    ],
    external: ['react', 'react-dom',...external,/node_modules/], 
  },
];
