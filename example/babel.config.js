module.exports = {
  presets: ['@babel/preset-typescript'],
  plugins: [
    [
      'import',
      {
        libraryName: '@td-design/web',
        libraryDirectory: 'es',
        style: true,
      },
    ],
  ],
};
