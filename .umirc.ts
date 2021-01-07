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
      title: '常见问题',
      path: '/faq',
    },
    {
      title: '发布日志',
      path: '/changelog',
    },
    {
      title: 'GitHub',
      path: 'https://github.com/thundersdata-frontend/td-design',
    },
  ],
});
