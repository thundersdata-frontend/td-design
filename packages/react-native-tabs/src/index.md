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

使用本组件需要单独安装：**yarn add @td-design/react-native-tabs**

## 效果演示

### 1. 默认效果

```tsx | pure
const scenes01 = [
  {
    key: 'first',
    title: 'First',
    scene: FirstRoute,
  },
  {
    key: 'second',
    title: 'Second',
    scene: SecondRoute,
  },
  {
    key: 'third',
    title: 'Third',
    scene: ThirdRoute,
  },
  {
    key: 'forth',
    title: 'Forth',
    scene: ForthRoute,
  },
  {
    key: 'fifth',
    title: 'Fifth',
    scene: FifthRoute,
  },
];

<SafeAreaView style={{ flex: 1 }}>
  <Tabs scenes={scenes01} swipeEnabled />
</SafeAreaView>;
```

<center>
  <img
    alt=""
    src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1644827868374467397.gif"
    style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
  />
</center>

### 2. 显示图标

```tsx | pure
const scenes03 = [
  {
    key: 'first',
    title: 'First',
    scene: FirstRoute,
    renderIcon: (active: boolean) =>
      active ? (
        <Image source={require('./assets/shouye_xz.png')} style={{ width: 16, height: 16, resizeMode: 'contain' }} />
      ) : (
        <Image source={require('./assets/shouye_wxz.png')} style={{ width: 16, height: 16, resizeMode: 'contain' }} />
      ),
  },
  {
    key: 'second',
    title: 'Second',
    scene: SecondRoute,
    renderIcon: (active: boolean) =>
      active ? (
        <Image source={require('./assets/wode_xz.png')} style={{ width: 16, height: 16, resizeMode: 'contain' }} />
      ) : (
        <Image source={require('./assets/wode_wxz.png')} style={{ width: 16, height: 16, resizeMode: 'contain' }} />
      ),
  },
  {
    key: 'third',
    title: 'Third',
    scene: ThirdRoute,
    renderIcon: (active: boolean) =>
      active ? (
        <Image source={require('./assets/shouye_xz.png')} style={{ width: 16, height: 16, resizeMode: 'contain' }} />
      ) : (
        <Image source={require('./assets/shouye_wxz.png')} style={{ width: 16, height: 16, resizeMode: 'contain' }} />
      ),
  },
];

<SafeAreaView style={{ flex: 1 }}>
  <Tabs scenes={scenes03} swipeEnabled showIcon />
</SafeAreaView>;
```

<center>
  <img
    alt=""
    src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1644828038285420207.gif"
    style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
  />
</center>

### 3. 自定义文本样式

```tsx | pure
const scenes03 = [
  {
    key: 'first',
    title: 'First',
    scene: FirstRoute,
    renderIcon: (active: boolean) =>
      active ? (
        <Image source={require('./assets/shouye_xz.png')} style={{ width: 16, height: 16, resizeMode: 'contain' }} />
      ) : (
        <Image source={require('./assets/shouye_wxz.png')} style={{ width: 16, height: 16, resizeMode: 'contain' }} />
      ),
  },
  {
    key: 'second',
    title: 'Second',
    scene: SecondRoute,
    renderIcon: (active: boolean) =>
      active ? (
        <Image source={require('./assets/wode_xz.png')} style={{ width: 16, height: 16, resizeMode: 'contain' }} />
      ) : (
        <Image source={require('./assets/wode_wxz.png')} style={{ width: 16, height: 16, resizeMode: 'contain' }} />
      ),
  },
  {
    key: 'third',
    title: 'Third',
    scene: ThirdRoute,
    renderIcon: (active: boolean) =>
      active ? (
        <Image source={require('./assets/shouye_xz.png')} style={{ width: 16, height: 16, resizeMode: 'contain' }} />
      ) : (
        <Image source={require('./assets/shouye_wxz.png')} style={{ width: 16, height: 16, resizeMode: 'contain' }} />
      ),
  },
];

<SafeAreaView style={{ flex: 1 }}>
  <Tabs scenes={scenes03} swipeEnabled showIcon textStyle={{ fontSize: 16, color: '#00f' }} />
</SafeAreaView>;
```

<center>
  <img
    alt=""
    src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1644828146511085068.gif"
    style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
  />
</center>

### 4. 自定义指示器样式

```tsx | pure
const scenes03 = [
  {
    key: 'first',
    title: 'First',
    scene: FirstRoute,
    renderIcon: (active: boolean) =>
      active ? (
        <Image source={require('./assets/shouye_xz.png')} style={{ width: 16, height: 16, resizeMode: 'contain' }} />
      ) : (
        <Image source={require('./assets/shouye_wxz.png')} style={{ width: 16, height: 16, resizeMode: 'contain' }} />
      ),
  },
  {
    key: 'second',
    title: 'Second',
    scene: SecondRoute,
    renderIcon: (active: boolean) =>
      active ? (
        <Image source={require('./assets/wode_xz.png')} style={{ width: 16, height: 16, resizeMode: 'contain' }} />
      ) : (
        <Image source={require('./assets/wode_wxz.png')} style={{ width: 16, height: 16, resizeMode: 'contain' }} />
      ),
  },
  {
    key: 'third',
    title: 'Third',
    scene: ThirdRoute,
    renderIcon: (active: boolean) =>
      active ? (
        <Image source={require('./assets/shouye_xz.png')} style={{ width: 16, height: 16, resizeMode: 'contain' }} />
      ) : (
        <Image source={require('./assets/shouye_wxz.png')} style={{ width: 16, height: 16, resizeMode: 'contain' }} />
      ),
  },
];

<SafeAreaView style={{ flex: 1 }}>
  <Tabs scenes={scenes03} swipeEnabled showIcon indicatorStyle={{ backgroundColor: 'red' }} />
</SafeAreaView>;
```

<center>
  <img
    alt=""
    src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1644828245151570652.gif"
    style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
  />
</center>

### 5. 隐藏指示器

```tsx | pure
const scenes03 = [
  {
    key: 'first',
    title: 'First',
    scene: FirstRoute,
    renderIcon: (active: boolean) =>
      active ? (
        <Image source={require('./assets/shouye_xz.png')} style={{ width: 16, height: 16, resizeMode: 'contain' }} />
      ) : (
        <Image source={require('./assets/shouye_wxz.png')} style={{ width: 16, height: 16, resizeMode: 'contain' }} />
      ),
  },
  {
    key: 'second',
    title: 'Second',
    scene: SecondRoute,
    renderIcon: (active: boolean) =>
      active ? (
        <Image source={require('./assets/wode_xz.png')} style={{ width: 16, height: 16, resizeMode: 'contain' }} />
      ) : (
        <Image source={require('./assets/wode_wxz.png')} style={{ width: 16, height: 16, resizeMode: 'contain' }} />
      ),
  },
  {
    key: 'third',
    title: 'Third',
    scene: ThirdRoute,
    renderIcon: (active: boolean) =>
      active ? (
        <Image source={require('./assets/shouye_xz.png')} style={{ width: 16, height: 16, resizeMode: 'contain' }} />
      ) : (
        <Image source={require('./assets/shouye_wxz.png')} style={{ width: 16, height: 16, resizeMode: 'contain' }} />
      ),
  },
];

<SafeAreaView style={{ flex: 1 }}>
  <Tabs scenes={scenes03} swipeEnabled showIcon showIndicator={false} />
</SafeAreaView>;
```

<center>
  <img
    alt=""
    src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1644828631817376873.gif"
    style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
  />
</center>

## API

### Tabs

| 属性                | 必填    | 说明                     | 类型                          | 默认值    |
| ------------------- | ------- | ------------------------ | ----------------------------- | --------- |
| keyboardDismissMode | `false` | 关闭键盘模式             | `none` \| `on-drag` \| `auto` | `on-drag` |
| swipeEnabled        | `false` | 启用手势控制左右滑动     | `boolean`                     | `true`    |
| lazy                | `false` | 启用懒加载               | `boolean`                     | `false`   |
| scenes              | `true`  | 选项卡面板配置           | `TabsScene[]`                 |           |
| activeTab           | `false` | 当前处于激活状态的选项卡 | `string`                      |           |
| bounces             | `false` | 启用回弹效果             | `boolean`                     | `false`   |
| tabBarStyle         | `false` | 选项卡标签栏样式         | `ViewStyle`                   |           |
| onTabPress          | `false` | 选择某个选项卡标签       | `() => void`                  |           |
| showIcon            | `false` | 是否显示图标             | `boolean`                     | `true`    |
| showIndicator       | `false` | 是否显示指示器           | `boolean`                     | `true`    |
| textStyle           | `false` | 标签文字样式             | `TextStyle`                   |           |
| indicatorStyle      | `false` | 指示器样式               | `ViewStyle`                   |           |

### TabsBar

| 属性            | 必填    | 说明                                       | 类型                           | 默认值  |
| --------------- | ------- | ------------------------------------------ | ------------------------------ | ------- |
| navigationState | `true`  | 选项卡组件的 state，包含了 index 和 routes | `NavigationState<CustomRoute>` |         |
| bounces         | `false` | 启用回弹效果                               | `boolean`                      | `false` |
| tabBarStyle     | `false` | 选项卡标签栏样式                           | `ViewStyle`                    |         |
| onTabPress      | `false` | 选择某个选项卡标签                         | `() => void`                   |         |
| showIcon        | `false` | 是否显示图标                               | `boolean`                      | `true`  |
| textStyle       | `false` | 标签文字样式                               | `TextStyle`                    |         |
| indicatorStyle  | `false` | 指示器样式                                 | `ViewStyle`                    |         |

### TabBarItem

| 属性            | 必填    | 说明                                       | 类型                             | 默认值  |
| --------------- | ------- | ------------------------------------------ | -------------------------------- | ------- |
| key             | `true`  | React.Key                                  | `string`                         |         |
| title           | `true`  | 标签页文本                                 | `string`                         |         |
| renderIcon      | `false` | 渲染图标                                   | `(active: boolean) => ReactNode` |         |
| onPres          | `false` | 点击标签页事件                             | `() => void`                     |         |
| active          | `true`  | 当前标签页是否处于激活状态                 | `boolean`                        | `false` |
| navigationState | `true`  | 选项卡组件的 state，包含了 index 和 routes | `NavigationState<CustomRoute>`   |         |
| showIcon        | `false` | 是否显示图标                               | `boolean`                        | `true`  |
| textStyle       | `false` | 标签文字样式                               | `TextStyle`                      |         |

### TabBarIndicator

| 属性 | 必填 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- | --- |
| measures | `true` | 计算拿到的各个标签栏的坐标信息 | `{left: number; top: number; width: number; height: number}[]` | `[]` |
| currentIndex | `true` | 当前处于激活状态的选项卡的 index | `number` | `0` |
| indicatorStyle | `false` | 指示器样式 | `ViewStyle` |  |

```ts
interface TabsScene {
  key: string;
  title: string;
  scene: () => JSX.Element;
}

type CustomRoute = {
  ref: RefObject<View>;
  renderIcon?: (active: boolean) => ReactNode;
} & Pick<TabsScene, 'key' | 'title'>;
```
