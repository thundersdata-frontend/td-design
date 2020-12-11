import { defineConfig } from 'dumi';

export default defineConfig({
  title: '雷数前端',
  favicon: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  mode: 'site',
  hash: true,
  // publicPath: './td-design/',
  // ssr: {},
  // exportStatic: {},
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
      title: 'GitHub',
      path: 'https://github.com/thundersdata-frontend/td-design',
    },
  ],
});
