export default {
  publicPath: './',
  base: '/',
  outputPath: '../../dist',
  doc: {
    title: '雷数前端',
    description: '杭州雷数前端API文档以及博客地址',
  },
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: '@td-design/web',
        libraryDirectory: 'es',
        style: 'css',
      },
    ],
  ],
};
