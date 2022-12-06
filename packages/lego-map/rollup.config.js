const commonjs = require('@rollup/plugin-commonjs');
const resolve = require('@rollup/plugin-node-resolve');
const postcss = require('rollup-plugin-postcss');
const less = require('less');
const typescript = require('rollup-plugin-typescript2')

const isProductionEnv = process.env.NODE_ENV === 'production';

const noDeclarationFiles = { compilerOptions: { declaration: false } };

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
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript({tsconfig: "tsconfig.json",tsconfigOverride:{ compilerOptions: { declaration: true ,declarationDir:'./lib/typescript'} },useTsconfigDeclarationDir: true}),
      postcss({
        minimize: isProductionEnv,
        process: processLess,
  
      }),
    ],
    external: ['react'],
  },
  {
    input: ['./src/index.tsx'],
    output: {
      dir: 'lib/module',
      format: 'esm',
      entryFileNames: '[name].js',
    },
    plugins: [
      resolve(),
      commonjs({ mainFields: ["module", "main", "jsnext:main", "browser"],
      extensions: [".js", ".mjs", ".json"],
      sourceMap: false,
      browser: true,}),
      typescript({ tsconfigOverride: noDeclarationFiles}),
      postcss({
        minimize: isProductionEnv,
        process: processLess,
      }),
    ],
    external: ['react'],
  }
]


