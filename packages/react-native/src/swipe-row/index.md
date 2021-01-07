---
title: SwipeRow - 滑动操作
nav:
  title: RN组件
  path: /react-native
group:
  title: Interaction
  path: /interaction
---

# SwipeRow 滑动操作

## 效果演示

### 1. 没有操作项

```tsx | pure
<FlatList
  data={[
    { id: 1, name: 'zhangsan' },
    { id: 2, name: 'lisi' },
  ]}
  keyExtractor={item => item.id.toString()}
  renderItem={({ item }) => (
    <SwipeRow>
      <View style={styles.rowContent}>
        <View style={styles.rowIcon} />
        <View>
          <Text style={styles.rowTitle}>{item.name}</Text>
          <Text style={styles.rowSubtitle}>Drag the row left and right</Text>
        </View>
      </View>
    </SwipeRow>
  )}
/>
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
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609988775816306743.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609988953851170750.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 2. 只有左滑操作项

```tsx | pure
<FlatList
  data={[
    { id: 1, name: 'zhangsan' },
    { id: 2, name: 'lisi' },
  ]}
  keyExtractor={item => item.id.toString()}
  renderItem={({ item }) => (
    <SwipeRow
      rightActions={[
        {
          label: '删除',
          onPress: () => console.log('remove'),
          backgroundColor: '#f8a024',
        },
        {
          label: '警告',
          onPress: () => console.log('warn'),
          backgroundColor: '#4f7db0',
        },
      ]}
    >
      <View style={styles.rowContent}>
        <View style={styles.rowIcon} />
        <View>
          <Text style={styles.rowTitle}>{item.name}</Text>
          <Text style={styles.rowSubtitle}>Drag the row left and right</Text>
        </View>
      </View>
    </SwipeRow>
  )}
/>
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
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609989184598674279.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609989167744061868.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 3. 只有右滑操作项

```tsx | pure
<FlatList
  data={[
    { id: 1, name: 'zhangsan' },
    { id: 2, name: 'lisi' },
  ]}
  keyExtractor={item => item.id.toString()}
  renderItem={({ item }) => (
    <SwipeRow
      leftActions={[
        {
          label: '确认',
          onPress: () => console.log('confirm'),
          backgroundColor: '#2f9a5d',
        },
        {
          label: 'OK',
          onPress: () => console.log('ok'),
          backgroundColor: 'gold',
        },
      ]}
    >
      <View style={styles.rowContent}>
        <View style={styles.rowIcon} />
        <View>
          <Text style={styles.rowTitle}>{item.name}</Text>
          <Text style={styles.rowSubtitle}>Drag the row left and right</Text>
        </View>
      </View>
    </SwipeRow>
  )}
/>
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
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609989288490482019.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609989377500041298.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 4. 左滑和右滑操作项

```tsx | pure
<FlatList
  data={[
    { id: 1, name: 'zhangsan' },
    { id: 2, name: 'lisi' },
  ]}
  keyExtractor={item => item.id.toString()}
  renderItem={({ item }) => (
    <SwipeRow
      leftActions={[
        {
          label: '确认',
          onPress: () => console.log('confirm'),
          backgroundColor: '#2f9a5d',
        },
        {
          label: 'OK',
          onPress: () => console.log('ok'),
          backgroundColor: 'gold',
        },
      ]}
      rightActions={[
        {
          label: '删除',
          onPress: () => console.log('remove'),
          backgroundColor: '#f8a024',
        },
        {
          label: '警告',
          onPress: () => console.log('warn'),
          backgroundColor: '#4f7db0',
        },
      ]}
    >
      <View style={styles.rowContent}>
        <View style={styles.rowIcon} />
        <View>
          <Text style={styles.rowTitle}>{item.name}</Text>
          <Text style={styles.rowSubtitle}>Drag the row left and right</Text>
        </View>
      </View>
    </SwipeRow>
  )}
/>
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
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609989603999765329.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609989561578881470.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 5. 自定义行高

```tsx | pure
<FlatList
  data={[
    { id: 1, name: 'zhangsan' },
    { id: 2, name: 'lisi' },
  ]}
  keyExtractor={item => item.id.toString()}
  renderItem={({ item }) => (
    <SwipeRow
      leftActions={[
        {
          label: '确认',
          onPress: () => console.log('confirm'),
          backgroundColor: '#2f9a5d',
        },
        {
          label: 'OK',
          onPress: () => console.log('ok'),
          backgroundColor: 'gold',
        },
      ]}
      rightActions={[
        {
          label: '删除',
          onPress: () => console.log('remove'),
          backgroundColor: '#f8a024',
        },
        {
          label: '警告',
          onPress: () => console.log('warn'),
          backgroundColor: '#4f7db0',
        },
      ]}
      height={100}
    >
      <View style={styles.rowContent}>
        <View style={styles.rowIcon} />
        <View>
          <Text style={styles.rowTitle}>{item.name}</Text>
          <Text style={styles.rowSubtitle}>Drag the row left and right</Text>
        </View>
      </View>
    </SwipeRow>
  )}
/>;

const styles = StyleSheet.create({
  rowContent: {
    flex: 1,
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#eeeeee',
  },
  rowIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 10,
    backgroundColor: '#73d4e3',
  },
  rowTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  rowSubtitle: {
    fontSize: 18,
    color: 'gray',
  },
});
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
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609989792298607673.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609989878322072213.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## API

### SwipeRow

| 属性           | 必填    | 说明             | 类型            | 默认值   |
| -------------- | ------- | ---------------- | --------------- | -------- |
| leftActions    | `false` | 左侧滑出的操作项 | `SwipeAction[]` | `[]`     |
| rightActions   | `false` | 右侧滑出的操作项 | `SwipeAction[]` | `[]`     |
| height         | `false` | 行高             | `number`        | `60`     |
| snapPointWidth | `false` | 每个操作项的宽度 | `number`        | `height` |

### SwipeAction

| 属性            | 必填    | 说明           | 类型         | 默认值 |
| --------------- | ------- | -------------- | ------------ | ------ |
| label           | `true`  | 操作项文本     | `string`     |        |
| textStyle       | `false` | 操作项文本样式 | `TextStyle`  |        |
| onPress         | `true`  | 操作项点击事件 | `() => void` |        |
| backgroundColor | `true`  | 背景色         | `string`     |        |
| containerStyle  | `false` | 操作项容器样式 | `ViewStyle`  |        |
