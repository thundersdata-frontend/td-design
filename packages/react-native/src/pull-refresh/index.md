---
title: PullRefresh - 下拉刷新组件
nav:
  title: RN组件
  path: /react-native
group:
  title: Other
  path: /other
---

# PullRefresh 下拉刷新组件

## 效果演示

### 1. 子组件为 FlatList

```tsx | pure
<SafeAreaView style={{ flex: 1 }}>
  <PullRefresh refreshing={refreshing} onRefresh={handleRefresh}>
    <FlatList
      data={data}
      keyExtractor={item => (item as any).key}
      renderItem={({ item }) => (
        <View style={{ width: '100%', height: 100, borderWidth: 1, borderColor: 'red' }}>
          <Text>{(item as any).text}</Text>
        </View>
      )}
      onEndReachedThreshold={0.1}
      onEndReached={handleEndReached}
    />
  </PullRefresh>
</SafeAreaView>
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
      alt="pullRefresh-ios1.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1624092140166510612.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="pullRefresh-android1.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1624092140166510612.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 2. 子组件为 ScrollView

```tsx | pure
<SafeAreaView style={{ flex: 1 }}>
  <PullRefresh refreshing={refreshing} onRefresh={handleRefresh}>
    <ScrollView style={{ flex: 1 }}>
      {data.map(item => (
        <View key={item.key} style={{ width: '100%', height: 100, borderWidth: 1, borderColor: 'red' }}>
          <Text>{item.text}</Text>
        </View>
      ))}
    </ScrollView>
  </PullRefresh>
</SafeAreaView>
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
      alt="pullRefresh-ios1.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1624092140166510612.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="pullRefresh-android1.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1624092140166510612.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 3. 自定义 Header 组件

```tsx | pure
<SafeAreaView style={{ flex: 1 }}>
  <PullRefresh refreshing={refreshing} onRefresh={handleRefresh} HeaderComponent={LottieHeader}>
    <ScrollView style={{ flex: 1 }}>
      {data.map(item => (
        <View key={item.key} style={{ width: '100%', height: 100, borderWidth: 1, borderColor: 'red' }}>
          <Text>{item.text}</Text>
        </View>
      ))}
    </ScrollView>
  </PullRefresh>
</SafeAreaView>
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
      alt="pullRefresh-ios1.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1624092094348333698.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="pullRefresh-android1.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1624092094348333698.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## API

### 下拉组件

| 属性 | 必填 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- | --- |
| refreshing | `true` | 是否正在刷新 | `boolean` | `false` |
| headerHeight | `false` | Header 组件的高度，也是触发刷新的下拉距离 | `number` | `60` |
| headerStyle | `false` | Header 组件样式 | `ViewStyle` |  |
| onRefresh | `true` | 刷新方法 | `() => void` |  |
| HeaderComponent | `false` | Header 组件 | `React.ComponentType<PullRefreshHeaderProps & RefAttributes<PullRefreshHeaderRef>>` | `DefaultHeader` |
| children | `true` | 子组件，必须是 PullRefresh 导出的 ScrollView 或者 FlatList | `ScrollView` \| `FlatList` |  |

### Header 组件

| 属性         | 必填    | 说明                                      | 类型        | 默认值  |
| ------------ | ------- | ----------------------------------------- | ----------- | ------- |
| refreshing   | `true`  | 是否正在刷新                              | `boolean`   | `false` |
| headerHeight | `false` | Header 组件的高度，也是触发刷新的下拉距离 | `number`    | `60`    |
| headerStyle  | `false` | Header 组件样式                           | `ViewStyle` |         |

## 子组件

- `DefaultHeader`: 默认的下拉 Header 组件
- `ScrollView`
- `FlatList`

## 自定义 Header 组件

参考`LottieHeader`组件如下：

```tsx | pure
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { PullRefreshHeaderProps, PullRefreshHeaderRef } from '@td-design/react-native/lib/typescript/pull-refresh/type';
import LottieView from 'lottie-react-native';

export const LottieHeader = forwardRef<PullRefreshHeaderRef, PullRefreshHeaderProps>(
  ({ refreshing, headerHeight, headerStyle }, ref) => {
    const [statePercent, setPercent] = useState(0);

    useImperativeHandle(ref, () => {
      return {
        setProgress,
      };
    });

    /** 必须要暴露出去 */
    const setProgress = ({ percent }: { percent: number }) => {
      setPercent(percent);
    };

    const style = useAnimatedStyle(() => ({
      opacity: statePercent,
      transform: [
        {
          translateY: -headerHeight,
        },
      ],
    }));

    return (
      <Animated.View
        style={[
          {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: headerHeight,
          },
          style,
          headerStyle,
        ]}
      >
        <LottieView source={require('./loading.json')} loop autoPlay />
      </Animated.View>
    );
  }
);
```

自定义 Header 组件必须要暴露一个`setProgress`的方法出去，才能接收到 PullRefresh 组件返回的`pullDistance`和`percent`参数。
