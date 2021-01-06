---
title: Tabs - 标签页组件
nav:
  title: RN组件
  path: /react-native
group:
  title: Navigation
  path: /navigation
  order: 7
---

# Tabs 标签页组件

该组件依赖[@react-navigation/material-top-tabs](https://github.com/react-navigation/react-navigation/tree/main/packages/bottom-tabs)

## 效果演示

### 1. 默认效果

```tsx | pure
<Tabs>
  <Tabs.Screen
    name="Home"
    component={HomeScreen}
    options={{
      tabBarIcon: ({ color }) => {
        return <Icon name="home" color={color} size={20} />;
      },
      tabBarLabel: () => {
        return <Text>首页</Text>;
      },
    }}
  />
  <Tabs.Screen name="Settings" component={SettingsScreen} options={{ title: '设置' }} />
  <Tabs.Screen name="Settings2" component={SettingsScreen} />
</Tabs>
```

<center>
  <div style="display:flex; width: 750px">
    <div style="width: 375px;">IOS效果图</div>
    <div style="width: 375px;">Android效果图</div>
  </div>
</center>
<center>
  <figure>
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609053807429895308.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609053700827408426.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 2. 自定义效果

```tsx | pure
<Tabs
  tabBarOptions={{
    /** 选中状态的颜色 */
    activeTintColor: 'green',
    /** 未选中状态的颜色 */
    inactiveTintColor: 'red',
    /** 图标的自定义样式 */
    iconStyle: {},
    /** 文本的自定义样式 */
    labelStyle: { color: '#000' },
    /** 徽标的自定义样式 */
    badgeStyle: { fontSize: 12 },
    /** 整个tab项主容器的自定义样式 */
    style: { borderWidth: 1, borderColor: 'red' },
    /** tab项父容器的自定义样式 */
    contentContainerStyle: { backgroundColor: 'grey' },
    /** 滚动指示器的自定义样式 */
    indicatorStyle: { backgroundColor: 'gold' },
    /** 滚动指示器的容器的自定义样式 */
    indicatorContainerStyle: { backgroundColor: 'green' },
    /** 单个tab项的自定义样式 */
    tabStyle: { backgroundColor: '#fff00f' },
  }}
>
  <Tabs.Screen
    name="Home"
    component={HomeScreen}
    options={{
      tabBarIcon: ({ color }) => {
        return <Icon name="home" color={color} size={20} />;
      },
      tabBarLabel: () => {
        return <Text>首页</Text>;
      },
    }}
  />
  <Tabs.Screen name="Settings" component={SettingsScreen} options={{ title: '设置' }} />
  <Tabs.Screen name="Settings2" component={SettingsScreen} />
</Tabs>
```

<center>
  <div style="display:flex; width: 750px">
    <div style="width: 375px;">IOS效果图</div>
    <div style="width: 375px;">Android效果图</div>
  </div>
</center>
<center>
  <figure>
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609053919880083008.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609054031039477317.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## API

### Tabs 属性

继承自：`@react-navigation/material-top-tabs`的`MaterialTopTabNavigationConfig`属性。参考：[https://reactnavigation.org/docs/material-top-tab-navigator](https://reactnavigation.org/docs/material-top-tab-navigator)

```ts
export type TabsProps = Omit<MaterialTopTabNavigationConfig, 'tabBarOptions'> & {
  tabBarOptions?: MaterialTopTabBarOptions & { showBadge?: boolean; badgeStyle?: StyleProp<TextStyle> };
};
```
