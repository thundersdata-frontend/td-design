import { defineConfig } from 'dumi';

export default defineConfig({
  title: '雷数前端',
  favicon: 'https://avatars0.githubusercontent.com/u/56826119',
  logo: 'https://avatars0.githubusercontent.com/u/56826119',
  outputPath: 'docs-dist',
  mode: 'site',
  hash: true,
  base: '/td-design',
  publicPath: '/td-design/',
  exportStatic: {},
  dynamicImport: {},
  chainWebpack: memo => {
    memo.module
      .rule('media')
      .test(/\.(mp4)$/)
      .use('file-loader')
      .loader(require.resolve('file-loader'));
  },
  // ssr: {},
  navs: [
    {
      title: 'RN组件库',
      path: '/react-native',
    },
    {
      title: '主题与样式',
      path: '/restyle',
    },
    {
      title: '设计模式',
      path: '/pattern',
    },
    {
      title: '数据结构',
      path: '/structure',
    },
    {
      title: '大屏素材库',
      path: '/screen',
    },
    {
      title: '常见问题',
      path: '/faq',
    },
    {
      title: '软件开发',
      path: '/development',
    },
    {
      title: 'GitHub',
      path: 'https://github.com/thundersdata-frontend/td-design',
    },
  ],
});
