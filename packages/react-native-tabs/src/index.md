---
title: Tabs - 选项卡组件
nav:
  title: RN组件
  path: /react-native
group:
  title: 选项卡组件
  path: /tabs
---

# Tabs 选项卡组件

本组件依赖于`react-native-pager-view`，所以你还需要一并安装它们：

```code
yarn add react-native-pager-view @td-design/react-native-tabs
```

## 效果演示

### 1. 默认效果

```tsx | pure
const routes = [
  { title: 'First', component: <LongList orderDate={orderDate} /> },
  { title: 'Second', component: <LongList orderDate={orderDate} /> },
  { title: 'Third', component: <LongList orderDate={orderDate} /> },
];

return (
  <Container>
    <Tabs scenes={routes} />
  </Container>
);
```

<center>
  <img
    alt=""
    src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1689759167501655832.gif"
    style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
  />
</center>

### 2. 自定义选项卡样式

```tsx | pure
const routes = [
  { title: 'First', component: <LongList orderDate={orderDate} /> },
  { title: 'Second', component: <LongList orderDate={orderDate} /> },
  { title: 'Third', component: <LongList orderDate={orderDate} /> },
];

return (
  <Container>
    <Tabs scenes={routes} tabStyle={{backgroundColor: 'red'}} />
  </Container>
);
```

<center>
  <img
    alt=""
    src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1689759271487559294.gif"
    style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
  />
</center>

### 3. 自定义选项卡文本样式

```tsx | pure
const routes = [
  { title: 'First', component: <LongList orderDate={orderDate} /> },
  { title: 'Second', component: <LongList orderDate={orderDate} /> },
  { title: 'Third', component: <LongList orderDate={orderDate} /> },
];

return (
  <Container>
    <Tabs scenes={routes} labelStyle={{color: 'red'}} />
  </Container>
);
```

<center>
  <img
    alt=""
    src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1689759277934027950.gif"
    style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
  />
</center>

### 4. 自定义指示器样式

```tsx | pure
const routes = [
  { title: 'First', component: <LongList orderDate={orderDate} /> },
  { title: 'Second', component: <LongList orderDate={orderDate} /> },
  { title: 'Third', component: <LongList orderDate={orderDate} /> },
];

return (
  <Container>
    <Tabs scenes={routes} indicatorStyle={{color: 'red', height: 10, borderRadius: 5}} />
  </Container>
);
```

<center>
  <img
    alt=""
    src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1689759281929283399.gif"
    style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
  />
</center>

### 5. 隐藏指示器

```tsx | pure
const routes = [
  { title: 'First', component: <LongList orderDate={orderDate} /> },
  { title: 'Second', component: <LongList orderDate={orderDate} /> },
  { title: 'Third', component: <LongList orderDate={orderDate} /> },
];

return (
  <Container>
    <Tabs scenes={routes} showIndicator={false} />
  </Container>
);
```

<center>
  <img
    alt=""
    src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1689759285404293900.gif"
    style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
  />
</center>

### 6. 很多个选项卡

```tsx | pure
const routes = [
  { title: 'First', component: <LongList orderDate={orderDate} /> },
  { title: 'Second', component: <LongList orderDate={orderDate} /> },
  { title: 'Third', component: <LongList orderDate={orderDate} /> },
  { title: 'Forth', component: <LongList orderDate={orderDate} /> },
  { title: 'Fifth', component: <LongList orderDate={orderDate} /> },
  { title: 'Sixth', component: <LongList orderDate={orderDate} /> },
  { title: 'Seventh', component: <LongList orderDate={orderDate} /> },
];

return (
  <Container>
    <Tabs scenes={routes} />
  </Container>
);
```

### 7. 默认切换到第二个选项卡

```tsx | pure
const routes = [
  { title: 'First', component: <LongList orderDate={orderDate} /> },
  { title: 'Second', component: <LongList orderDate={orderDate} /> },
  { title: 'Third', component: <LongList orderDate={orderDate} /> },
];

return (
  <Container>
    <Tabs scenes={routes} initialPage={1} />
  </Container>
);
```

<center>
  <img
    alt=""
    src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1689841071351022756.gif"
    style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
  />
</center>

## API

| 属性                | 必填    | 说明                                       | 类型                | 默认值    |
| ------------------- | ------- | ------------------------------------------ | ------------------- | --------- |
| scenes              | `true`  | 选项卡面板配置                             | `TabScene[]`        |           |
| initialPage         | `false` | 默认切换到第几个选项卡                     | `number`            | `0`       |
| height              | `false` | 选项卡高度                                 | `boolean`           | `48`      |
| scrollEnabled       | `false` | 启用手势控制左右滑动                       | `boolean`           | `true`    |
| overdrag            | `false` | 到第一页或者最后一页之后还是否允许继续拖动 | `boolean`           | `true`    |
| keyboardDismissMode | `false` | 关闭键盘模式                               | `none` \| `on-drag` | `on-drag` |
| showIndicator       | `false` | 是否显示指示器                             | `boolean`           | `true`    |
| tabStyle            | `false` | 选项卡样式                                 | `ViewStyle`         |           |
| tabItemStyle        | `false` | 选项卡标签样式                             | `ViewStyle`         |           |
| labelStyle          | `false` | 标签文字样式                               | `TextStyle`         |           |
| indicatorStyle      | `false` | 指示器样式                                 | `ViewStyle`         |           |
| lazy                | `false` | 是否启用懒加载模式                         | `boolean`           |           |
| lazyPlaceholder     | `false` | 懒加载时的placeholder组件                  | `() => ReactNode`   |           |

```ts
interface TabScene {
  title: ReactNode;
  component: JSX.Element;
}
```
