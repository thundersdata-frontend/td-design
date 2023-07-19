---
title: Tabs - 选项卡组件
nav:
  title: RN组件
  path: /react-native
group:
  title: Tabs
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
  { key: 'first', title: 'First', component: <LongList orderDate={orderDate} /> },
  { key: 'second', title: 'Second', component: <LongList orderDate={orderDate} /> },
  { key: 'third', title: 'Third', component: <LongList orderDate={orderDate} /> },
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
  { key: 'first', title: 'First', component: <LongList orderDate={orderDate} /> },
  { key: 'second', title: 'Second', component: <LongList orderDate={orderDate} /> },
  { key: 'third', title: 'Third', component: <LongList orderDate={orderDate} /> },
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

### 3. 自定义选项卡文本

```tsx | pure
const routes = [
  { key: 'first', title: () => <Text color="func200">First</Text>, component: <LongList orderDate={orderDate} /> },
  { key: 'second', title: () => <Text color="func300">Second</Text>, component: <LongList orderDate={orderDate} /> },
  { key: 'third', title: () => <Text color="func400">Third</Text>, component: <LongList orderDate={orderDate} /> },
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
    src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1689759275113622526.gif"
    style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
  />
</center>

### 4. 自定义选项卡文本样式

```tsx | pure
const routes = [
  { key: 'first', title: 'First', component: <LongList orderDate={orderDate} /> },
  { key: 'second', title: 'Second', component: <LongList orderDate={orderDate} /> },
  { key: 'third', title: 'Third', component: <LongList orderDate={orderDate} /> },
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

### 5. 自定义指示器样式

```tsx | pure
const routes = [
  { key: 'first', title: 'First', component: <LongList orderDate={orderDate} /> },
  { key: 'second', title: 'Second', component: <LongList orderDate={orderDate} /> },
  { key: 'third', title: 'Third', component: <LongList orderDate={orderDate} /> },
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

### 6. 隐藏指示器

```tsx | pure
const routes = [
  { key: 'first', title: 'First', component: <LongList orderDate={orderDate} /> },
  { key: 'second', title: 'Second', component: <LongList orderDate={orderDate} /> },
  { key: 'third', title: 'Third', component: <LongList orderDate={orderDate} /> },
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

### 7. 很多个选项卡

```tsx | pure
const routes = [
  { key: 'first', title: 'First', component: <LongList orderDate={orderDate} /> },
  { key: 'second', title: 'Second', component: <LongList orderDate={orderDate} /> },
  { key: 'third', title: 'Third', component: <LongList orderDate={orderDate} /> },
  { key: 'forth', title: 'Forth', component: <LongList orderDate={orderDate} /> },
  { key: 'fifth', title: 'Fifth', component: <LongList orderDate={orderDate} /> },
  { key: 'sixth', title: 'Sixth', component: <LongList orderDate={orderDate} /> },
  { key: 'seventh', title: 'Seventh', component: <LongList orderDate={orderDate} /> },
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
    src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1689759289138849119.gif"
    style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
  />
</center>

## API

| 属性                | 必填    | 说明                                       | 类型                    | 默认值    |
| ------------------- | ------- | ------------------------------------------ | ----------------------- | --------- |
| scenes              | `true`  | 选项卡面板配置                             | `TabScene[]`            |           |
| onChange            | `false` | 选择某个选项卡标签                         | `(key: string) => void` |           |
| height              | `false` | 选项卡高度                                 | `boolean`               | `48`      |
| scrollEnabled       | `false` | 启用手势控制左右滑动                       | `boolean`               | `true`    |
| overdrag            | `false` | 到第一页或者最后一页之后还是否允许继续拖动 | `boolean`               | `true`    |
| keyboardDismissMode | `false` | 关闭键盘模式                               | `none` \| `on-drag`     | `on-drag` |
| showIndicator       | `false` | 是否显示指示器                             | `boolean`               | `true`    |
| tabStyle            | `false` | 选项卡样式                                 | `ViewStyle`             |           |
| tabItemStyle        | `false` | 选项卡标签样式                             | `ViewStyle`             |           |
| labelStyle          | `false` | 标签文字样式                               | `TextStyle`             |           |
| indicatorStyle      | `false` | 指示器样式                                 | `IndicatorStyle`        |           |

```ts
interface TabScene {
  key: string;
  title: ReactNode;
  component: JSX.Element;
}

interface IndicatorStyle {
  height?: number;
  borderRadius?: number;
  color?: string;
}
```
