---
title: 介绍
order: 51
group:
  title: Web组件库
---

# Web 组件库

## Web 组件库介绍

Web 组件库主要指对 PC 项目，尤其是中后台管理系统的沉淀和抽取，把业务中比较常见的场景以及能够复用的功能抽象成组件。
Web 组件库基于[ant design](https://ant.design/index-cn)进行二次封装，目前已经沉淀了 **18** 个业务组件。

## Web 组件库使用

### 安装

- 使用`npm`:

```
  npm install @td-design/web @td-design/utils --save
```

- 使用`yarn`:

```
  yarn add @td-design/web @td-design/utils
```

### 配置

- 如果使用公司封装的前端 PC 模板[`spa-template`](http://github.com/thundersdata-frontend/spa-template)，就不需要配置，模板已经默认配置好了。
- 如果是非`spa-template`项目：
  - 安装`babel-plugin-import`：`npm install --save-dev babel-plugin-import`
  - 修改根目录下的`babel.config.js`文件（如果没有，就新建一个）

```js
module.exports = {
  // ...other config
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
```

### 使用

```jsx | pure
import React from 'react';
import { Card } from '@td-design/web';

export default () => <Card title="test">我是测试</Card>;
```

### 效果

```jsx
import React from 'react';
import { Card } from '@td-design/web';

export default () => <Card title="test">我是测试</Card>;
```

## 项目常用配置说明

### 使用 iconfont.cn

在项目中使用自定义图标，我们总结出来有三种方式：

- 可以访问外网

  - 基于 Ant Design 的`Icon`组件
    Ant Design 的`Icon`组件提供了一个`createFromIconfontCN`的方法

    ```jsx | pure
      import React from 'react';
      import ReactDOM from 'react-dom';
      import { Icon } from 'antd';
      const Iconfont = Icon.createFromIconfontCN({
        scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
      });

      // 使用
      <IconFont type="icon-tuichu" />
      <IconFont type="icon-facebook" />
      <IconFont type="icon-twitter" />
    ```

  - 自定义组件
    首先在 index.html 里面配置图标的线上地址：

    ```html
    <link rel="stylesheet" type="text/css" href="//at.alicdn.com/t/font_1322153_nxxj5gfzvq9.css" />
    ```

    在项目中创建一个`Iconfont`的自定义组件

    ```jsx | pure
    import * as React from 'react';
    interface IconfontProps {
      name: string;
      classname?: string;
    }
    /**自定义图标 */
    const Iconfont: React.SFC<IconfontProps> = (props: IconfontProps) => {
      return <i className={`iconfont ${props.name || ''} ${props.classname}`} />;
    };
    export default Iconfont;

    //使用
    <Iconfont name="arrow-right" />;
    ```

- 不能访问外网
  - 从 iconfont 网站下载图标字体
  - 在项目里复制下载的文件夹里的`iconfont.css`、`iconfont.eot`、`iconfont.svg`、`iconfont.ttf`、`iconfont.woff`、`iconfont.woff2`文件到某个目录下
  - 新建`Iconfont`组件：
    ```jsx | pure
    import * as React from 'react';
    export default function Iconfont({ name, className, ...restProps }) {
      return <i className={`iconfont ${name} ${className || ''}`} {...restProps} />;
    }
    ```
  - 使用：
  ```jsx | pure
  <Iconfont name="iconfont.css里面定义的那些类名" />
  ```

### 其他待补充
