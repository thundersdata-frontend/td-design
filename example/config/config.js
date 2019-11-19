import routeConfig from './route.config';
import ThemeReplacerPlugin from '@td-design/webpack-theme-replacer';
import themeTemplate from './theme-template';
import theme from './theme-config';

export default {
  routes: routeConfig,
  targets: {
    chrome: 49,
    firefox: 45,
    safari: 10,
    edge: 13,
    ios: 10,
    ie: 10,
  },
  history: 'hash',
  outputPath: './build',
  plugins: [
    'umi-plugin-polyfill',
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: false,
        dynamicImport: {
          webpackChunkName: true,
          loadingComponent: './components/Loading.tsx',
        },
        // 想要在开发环境使用主题替换方法 需要在这里配置或在index.html模版中引用
        headScripts: [{ charset: 'utf-8', src: '<%= PUBLIC_PATH %>theme-setting.js' }],
        title: '', // 项目自行补充
        library: 'react',
        dll: false,
        pwa: false,
        hardSource: false,
        fastClick: true,
      },
    ],
  ],
  minimizer: 'terserjs',
  exportStatic: {
    htmlSuffix: false,
  },
  treeShaking: true,
  autoprefixer: {
    browsers: ['> 1%', 'last 2 versions', 'not ie <= 10'],
  },
  theme: themeTemplate, // 配置模版主题样式 最终应用的是theme-config.js的配置
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  define: {
    'process.env.PROD': JSON.stringify(false),
  },
  chainWebpack(config) {
    config.merge({
      plugin: {
        install: {
          plugin: new ThemeReplacerPlugin({
            theme,
            template: themeTemplate,
            antd: true,
            // 想替换项目中的less变量 直接在theme对应的两个配置文件中添加即可
            // 如果项目中使用到了less的fade等方法 这里提供了额外的配置项（不建议使用一些方法转换主题变量，内置的less方法并不完善，并且fade对不同透明度处理结果可能是相同的）
            // 例：background-color: fade(@my-color, 10%); 我需要把这个背景样式集成到主题配置，可以通过如下方法，传入自定义方法func或者使用插件内置函数来处理
            computed: [
              {
                func: () => {},
                insidePluginKey: 'fade',
                include: [
                  {
                    sourceKey: '@my-color',
                    themeKey: '@my-background-color',
                    params: ['10%'],
                  },
                ],
              },
            ],
          }),
        },
      },
    });
  },
};
