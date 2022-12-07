const commonjs = require('@rollup/plugin-commonjs');
const resolve = require('@rollup/plugin-node-resolve');
const typescript = require('rollup-plugin-typescript2')


const noDeclarationFiles = { compilerOptions: { declaration: false } };



module.exports = [
  {
    input: ['./src/index.ts'],
    output: {
      dir: 'lib/commonjs',
      format: 'cjs',
      name: '[name].js',
      preserveModules: true, 
      preserveModulesRoot: 'src',
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript({tsconfig: "tsconfig.json",tsconfigOverride:{ compilerOptions: { declaration: true ,declarationDir:'./lib/typescript'} },useTsconfigDeclarationDir: true}),
    ],
    external: ['react','react-native'],
  },
  {
    input: ['./src/index.ts'],
    output: {
      dir: 'lib/module',
      format: 'esm',
      entryFileNames: '[name].js',
      preserveModules: true, 
      preserveModulesRoot: 'src',
    },
    plugins: [
      resolve(),
      commonjs({ mainFields: ["module", "main", "jsnext:main", "browser"],
      extensions: [".js", ".mjs", ".json"],
      sourceMap: false,
      browser: true,}),
      typescript({ tsconfigOverride: noDeclarationFiles}),
    ],
    external: ['react','react-native'],
  }
]


