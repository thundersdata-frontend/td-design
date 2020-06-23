# `@td-design/charts`

## 概要

基于 G2 和 G2Plot 的雷数图表组件库

## 使用方法

### 用 babel-plugin-import 引入@td-design/charts 组件样式

需要在项目根目录下`babel.config.js`文件中加入以下配置：

```js
plugins: [
    [
      'import',
      {
        libraryName: '@td-design/charts',
        customName: (name) => {
          if (name.indexOf('create') > -1) {
            return `@td-design/charts/es/utils/${name}`;
          }
          return `@td-design/charts/es/components/${name}`;
        },
        style: true,
      },
    ],
  ],
```

## API

从 `@td-design/charts` 下导出两种 API：

- DOM 组件
- 图表生成方法

全部 API 结构如下：  
@td-design/charts  
　|-- components (DOM 组件类)  
 　　　|-- ChartDom (图表组合组件)  
 　　　|-- ComBlock (组件显示的载体,包含 border )  
 　　　|-- ComCard (大屏卡片组件)  
 　　　|-- ChartPlot (图表组件)  
　|-- utils (图表生成方法)  
 　　　|-- createLinePlot (普通折线图)  
 　　　|-- createColumnPlot (普通柱状图)  
 　　　|-- createGroupColumnPlot (分组柱状图)  
 　　　|-- createDonutPlot (基础环图)  
 　　　|-- createStackColumnPlot (堆叠柱状图)  
 　　　|-- createRangeColumnPlot (区间柱状图)  
 　　　|-- createWaterfallPlot (瀑布图)  
 　　　|-- createLiquidPlot (水波图)  
 　　　|-- createDonutRosePlot (玫瑰图)  
 　　　|-- createCustomBarPlot (基础条形图)  
 　　　|-- createStackRosePlot (堆叠玫瑰图)  
 　　　|-- createRadarPlot (雷达图)  
 　　　|-- createStackAreaPlot (堆叠面积图)  
 　　　|-- createScatterPlot (单象限散点图)  
 　　　|-- createCustomRangeBarPlot (区间条形图)  
 　　　|-- createRadialStackPlot (径向堆叠柱形图)  
 　　　|-- createCustomGroupedBarPlot (分组条形图)  
 　　　|-- createColumnLinePlot (柱线混合图)  
 　　　|-- createGroupedColumnLinePlot (分组柱线混合图)  
 　　　|-- createDualLinePlot (双折线图)

## 在线文档

具体导出的组件和方法详见 <a href="https://thundersdata-frontend.github.io/td-doc/#/charts">在线文档</a> 。

## 主题切换方法

如果需要使用图表主题功能以实现主题配置或主题切换。

### 步骤一：安装环境

安装最新版 `umi-plugin-antd-theme`，

### 步骤二：基础配置

在项目 config 文件夹下新建 theme.config.json 文件，然后加入以下配置：

```json
{
  "theme": [
    {
      "theme": "dark",
      "fileName": "dark.css",
      "modifyVars": {
        "@blue-screen-bg": "#090b2c"
      }
    },
    {
      "theme": "light",
      "fileName": "light.css",
      "modifyVars": {
        "@blue-screen-bg": "#fff"
      }
    }
  ],
  // 是否压缩css
  "min": true,
  // css module
  "isModule": true,
  // 忽略 antd 的依赖
  "ignoreAntd": false,
  // 忽略 pro-layout
  "ignoreProLayout": false,
  // 使用缓存
  "cache": true,
  // 引入外库less文件
  "extraLibraries": ["@td-design/charts"]
}
```

theme 下的 modifyVars 下默认可配置 antd 的自带样式变量如：@primary-color 等。

其中 `extraLibraries` 项目加入组件库名称后可以引入其他库的样式，并且添加组件库中定义的 less 变量到 modifyVars 下，可实现对该变量的主题色自定义配置，就可以实现组件库主题样式的统一配置。

### 步骤三：项目中使用经过主题色配置的变量

在 src/styles 文件夹下 default.less 下添加该变量的默认配置。如：

```less
@blue-screen-bg: #fff;
```

在项目的样式文件`xxx.module.less`中使用该颜色变量，并从 default.less 文件中引入。`antd-pro-merge-less` 会自动将该组件库中处理过的样式整合入`/theme/xxx.css`下，缓存在 node_modules/.plugin-theme 下 配合 theme/index.ts 中的主题切换方法就可以实现自定义主题色配置了。

### 步骤四：在项目中初始化/切换使用主题

#### 初始化主题

global.ts 中配置初始 theme ，这里配置了 `dark` 为初始主题：

```ts
((global as unknown) as CustomWindow).chartConfig = {
  theme: 'dark',
};
```

interfaces/common.ts 下需要新增 chartConfig 属性：

```ts
// interfaces/common.ts
export interface CustomWindow extends Window {
  // 其他配置
  chartConfig: {
    theme: string;
    themeConfig?: {
      // 对应主题色
      [name: string]: {
        [name: string]: string;
      };
    };
  };
}
```

在 app.ts 的 `render` 方法中调用 `themeInit` 方法，新建 `theme/index.ts` 并放入以下代码:

```ts
// theme/index.ts文件
import { CustomWindow } from '@/interfaces/common';

/**
 * @功能描述: 获得url中的传参
 * @参数: name(指定项的key值)
 * @返回值: 若有name，则返回指定项的value，若没有name则返回一个query的json
 */
const getUrlQuery = (name?: string) => {
  let after = window.location.search || window.location.hash;
  after = after ? after.split('?')[1] : '';
  const query = {};
  const strs = after ? after.split('&') : [];
  for (let i = 0; i < strs.length; i += 1) {
    const keyValueMaps = strs[i] ? strs[i].split('=') : [];
    if (keyValueMaps.length === 2) {
      query[keyValueMaps[0]] = decodeURIComponent(keyValueMaps[1]);
    } else if (keyValueMaps[0]) {
      query[keyValueMaps[0]] = null;
    }
  }

  if (name && typeof name !== 'object') {
    return query[name];
  }

  return query;
};

/**
 * @功能描述: 跳转到修改/添加某参数后格式化过的url
 * @参数: @param paramName 参数名,@param paramValue 参数值
 * @返回值: void
 */
const getFormatedUrl = (paramName: string, paramValue: string) => {
  const params = getUrlQuery();
  const { origin, pathname } = window.location;
  let newUrl = `${origin}${pathname}?`;
  // 除了paramName之外的参数数组
  const otherParamsKeys = Object.keys(params).filter(item => item !== paramName);
  otherParamsKeys.forEach((item, idx) => {
    newUrl = newUrl.concat(`${idx !== 0 ? '&' : ''}${item}=${params[item]}`);
  });
  const formatedUrl = `${newUrl}${otherParamsKeys.length > 0 ? '&' : ''}${paramName}=${paramValue}`;
  window.location.href = formatedUrl;
};

/**
 * @功能描述: 初始化自定义主题色/重新设定主题色
 * @参数: 如果需要修改主题可传入主题theme，否则可不传
 * @返回值: 无
 */
export const themeInit = (customTheme?: string) => {
  const { chartConfig } = (global as unknown) as CustomWindow;
  let { theme } = chartConfig;
  let styleLink = document.getElementById('theme-style') as HTMLLinkElement;
  const body = document.getElementsByTagName('body')[0];
  const newTheme = customTheme || getUrlQuery('theme');
  if (newTheme) {
    ((global as unknown) as CustomWindow).chartConfig.theme = newTheme;
    // 如果地址存在theme参数，使用该theme
    theme = newTheme;
    if (customTheme) {
      getFormatedUrl('theme', theme);
    }
  } else {
    // 如果地址不存在theme参数，添加theme
    getFormatedUrl('theme', theme);
  }

  if (styleLink) {
    // 假如存在id为theme-style 的link标签，直接修改其href
    if (theme) {
      styleLink.href = `/theme/${theme}.css`;
      body.className = `body-warp-${theme}`; // 切换自定义组件的主题
    }
  } else {
    // 不存在的话，则新建一个
    styleLink = document.createElement('link');
    styleLink.type = 'text/css';
    styleLink.rel = 'stylesheet';
    styleLink.id = 'theme-style';
    if (theme) {
      styleLink.href = `/theme/${theme}.css`;
      body.className = `body-warp-${theme}`; // 切换自定义组件的主题
    }
    document.body.append(styleLink);
  }
};
```

#### 切换主题

1.如果需要切换主题的功能，则需要配置`chartConfig`中的`themeConfig`属性，在`themeConfig`下需要配置对应主题的属性。

比如：需要`dark`和`light`的主题切换，则可以配置`chartConfig`如下：

```ts
((global as unknown) as CustomWindow).chartConfig = {
  theme: 'dark',
  themeConfig: {
    // 暗黑主题
    dark: {
      // 图例文字颜色
      legendColor: 'rgba(255, 255, 255, 0.6)',
      // 图表文字颜色
      fontColor: 'rgba(255, 255, 255, 0.4)',
      // 环形图
      donutConfig: {
        // 环形边缘颜色(间隔颜色)
        stroke: '#122749',
      },
      // 注水图
      liquidConfig: {
        statistic: {
          // 中间指标字体颜色
          fill: '#fff',
        },
      },
    },
    // 白色主题
    light: {
      // 图例文字颜色
      legendColor: '#333',
      // 图表文字颜色
      fontColor: '#333',
      // 环形图
      donutConfig: {
        // 环形边缘颜色(间隔颜色)
        stroke: '#fff',
      },
      // 注水图
      liquidConfig: {
        statistic: {
          // 中间指标字体颜色
          fill: '#333',
        },
      },
    },
  },
};
```

目前主题库有`dark`和`light`，上面的属性(如`legendColor`)是全部目前图表库暴露的可配置属性，都是可选可不选的，如果不传会用默认的主题设置。如果是自定义的其他主题，图表库则会默认使用`dark`主题颜色作为模板。

2.调用 themeInit 方法(从 theme/index.ts 中引入)并传入主题名称即可。如：

```js
import { themeInit } from '@/theme';

// 切换为 light 主题
themeInit('light');
```

- 注：在 global.less 中的样式不会被整合，所以修改不会生效。
