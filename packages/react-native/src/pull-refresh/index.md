---
title: PullRefresh - 下拉刷新组件
nav:
  title: RN组件
  path: /react-native
group:
  title: Interaction
  path: /interaction
---

# PullRefresh 下拉刷新组件

## 效果演示

```tsx | pure
const content = (
  <>
    <View style={{ paddingVertical: 30, borderWidth: 1, borderColor: 'red', backgroundColor: 'white' }}>
      <Text>123123</Text>
    </View>
    <View style={{ paddingVertical: 30, borderWidth: 1, borderColor: 'red' }}>
      <Text>123123</Text>
    </View>
    <View style={{ paddingVertical: 30, borderWidth: 1, borderColor: 'red' }}>
      <Text>123123</Text>
    </View>
    <View style={{ paddingVertical: 30, borderWidth: 1, borderColor: 'red' }}>
      <Text>123123</Text>
    </View>
    <View style={{ paddingVertical: 30, borderWidth: 1, borderColor: 'red' }}>
      <Text>123123</Text>
    </View>
    <View style={{ paddingVertical: 30, borderWidth: 1, borderColor: 'red' }}>
      <Text>123123</Text>
    </View>
    <View style={{ paddingVertical: 30, borderWidth: 1, borderColor: 'red' }}>
      <Text>123123</Text>
    </View>
    <View style={{ paddingVertical: 30, borderWidth: 1, borderColor: 'red' }}>
      <Text>123123</Text>
    </View>
    <View style={{ paddingVertical: 30, borderWidth: 1, borderColor: 'red' }}>
      <Text>123123</Text>
    </View>
    <View style={{ paddingVertical: 30, borderWidth: 1, borderColor: 'red' }}>
      <Text>123123</Text>
    </View>
  </>
);
```

### 1. ScrollView + 普通刷新组件

```tsx | pure
<PullRefresh
  refreshComponent={
    <View style={{ height: 60, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator />
    </View>
  }
  onRefresh={handleRefresh}
  onProgress={setProgress}
>
  {content}
</PullRefresh>
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
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608121429992107259.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt=""
      src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607430991524&di=24c0bf75a6d0efeff1c48e13829eca72&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201308%2F23%2F220651x9b0h4kru904ozre.jpg"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 2. ScrollView + Lottie 动画

```tsx | pure
const [progress, setProgress] = useState(0);
const lottieViewRef = useRef<LottieView>(null);

<PullRefresh
  refreshComponent={
    <LottieView
      style={{ height: 60 }}
      ref={lottieViewRef}
      source={loadingAnimation}
      progress={progress}
      autoSize
      loop
    />
  }
  onRefresh={async () => {
    lottieViewRef.current!.play();
    await handleRefresh();
    lottieViewRef.current!.reset();
  }}
  onProgress={setProgress}
>
  {content}
</PullRefresh>;
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
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608121575330094035.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt=""
      src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607430991524&di=24c0bf75a6d0efeff1c48e13829eca72&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201308%2F23%2F220651x9b0h4kru904ozre.jpg"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 3. FlatList + Lottie 动画

```tsx | pure
const [progress, setProgress] = useState(0);
const lottieViewRef = useRef<LottieView>(null);

<PullRefresh<{ id: number; label: string }>
  scrollComponent="FlatList"
  refreshComponent={
    <LottieView
      style={{ height: 60 }}
      ref={lottieViewRef}
      source={loadingAnimation}
      progress={progress}
      autoSize
      loop
    />
  }
  onRefresh={async () => {
    lottieViewRef.current!.play();
    await handleRefresh();
    lottieViewRef.current!.reset();
  }}
  onProgress={setProgress}
  data={Array(10)
    .fill('')
    .map((_, index) => ({ id: index + 1, label: `hahaha${index + 1}` }))}
  renderItem={({ item }) => (
    <View style={{ paddingVertical: 30, borderWidth: 1, borderColor: 'red', backgroundColor: 'white' }}>
      <Text>{item.label}</Text>
    </View>
  )}
  keyExtractor={item => item.id.toString()}
/>;
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
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608121788620647345.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt=""
      src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607430991524&di=24c0bf75a6d0efeff1c48e13829eca72&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201308%2F23%2F220651x9b0h4kru904ozre.jpg"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## 注意事项

- 如果配合 Lottie 动画时，必须要传`onProgress`，这样才能拿到下拉比例传给 Lottie 动画，用来实现在拖动时 Lottie 会随着一起改变的效果。
- 使用 Lottie 动画时，`onRefresh` 需要增加对动画开始和重置的支持。代码如上所示。

## API

属性继承自

[https://reactnative.dev/docs/scrollview](https://reactnative.dev/docs/scrollview)

[https://reactnative.dev/docs/flatlist](https://reactnative.dev/docs/flatlist)

| 属性                 | 必填    | 说明                       | 类型                         | 默认值       |
| -------------------- | ------- | -------------------------- | ---------------------------- | ------------ |
| scrollComponent      | `false` | 滚动组件类型               | `ScrollView` \| `FlatList`   | `ScrollView` |
| refreshComponent     | `true`  | 传入的自定义刷新组件       | `ReactNode`                  | ``           |
| refreshTriggerHeight | `false` | 触发刷新的高度             | `number`                     | `60`         |
| onProgress           | `false` | 滚动过程拿到滚动百分比     | `(progress: number) => void` | ``           |
| onRefresh            | `true`  | 手势释放之后触发的刷新方法 | `() => Promise`              | ``           |
| children             | `false` | 子组件                     | `ReactNode`                  | ``           |
