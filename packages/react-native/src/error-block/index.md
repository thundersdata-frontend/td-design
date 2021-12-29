---
title: ErrorBlock - 异常捕获组件
nav:
  title: RN组件
  path: /react-native
group:
  title: Other
  path: /other
---

# ErrorBlock 异常捕获组件

内置了两种场景：

- 代码出错，包括 hooks 内出错、render 内出错，这时候会显示默认的应用出错的界面
- 网络请求出错，即代码层面通过`throw new Error(JSON.stringify({type: 'network'}))`，这时候会显示内置的网络请求失败的出错界面

具体测试代码可以参见 `exmaple` 里面的 `ErrorBlockDemo.tsx` 文件

## API

| 属性       | 必填    | 说明                 | 类型                                           | 默认值 |
| ---------- | ------- | -------------------- | ---------------------------------------------- | ------ |
| customNode | `false` | 自定义出错时渲染组件 | `ReactNode`                                    |        |
| onError    | `false` | 异常捕获的处理逻辑   | `(error: Error, errorInfo: ErrorInfo) => void` |        |
| onRefresh  | `false` | 重新刷新逻辑         | `() => void`                                   |        |
