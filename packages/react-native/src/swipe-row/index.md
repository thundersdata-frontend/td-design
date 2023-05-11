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

### 1. 默认效果（默认带删除操作项）

```tsx | pure
<SwipeRowContextProvider>
  <FlatList
    data={[
      { id: 1, name: 'zhangsan' },
      { id: 2, name: 'lisi' },
    ]}
    keyExtractor={item => item.id.toString()}
    renderItem={({ item, index }) => (
      <SwipeRow anchor={item.id} height={80}>
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
</SwipeRowContextProvider>
```

<center>
  <figure>
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643252811536164582.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 2. 右滑操作项

```tsx | pure
<SwipeRowContextProvider>
  <FlatList
    data={[
      { id: 1, name: 'zhangsan' },
      { id: 2, name: 'lisi' },
    ]}
    keyExtractor={item => item.id.toString()}
    renderItem={({ item, index }) => (
      <SwipeRow
        anchor={item.id}
        actions={[
          {
            label: '警告',
            onPress: () => console.log('warn'),
            backgroundColor: '#4f7db0',
          },
        ]}
        height={80}
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
</SwipeRowContextProvider>
```

<center>
  <figure>
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643252879087664662.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 3. 覆盖默认操作项

```tsx | pure
<SwipeRowContextProvider>
  <FlatList
    data={[
      { id: 1, name: 'zhangsan' },
      { id: 2, name: 'lisi' },
    ]}
    keyExtractor={item => item.id.toString()}
    renderItem={({ item, index }) => (
      <SwipeRow
        anchor={item.id}
        actions={[
          {
            label: '警告',
            onPress: () => console.log('warn'),
            backgroundColor: '#4f7db0',
          },
        ]}
        height={80}
        overwriteDefaultActions
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
</SwipeRowContextProvider>
```

<center>
  <figure>
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643253019661089047.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## API

### SwipeRow

| 属性                    | 必填    | 说明                       | 类型            | 默认值   |
| ----------------------- | ------- | -------------------------- | --------------- | -------- |
| anchor                  | `true`  | 作为滑动操作互斥的判断依据 | `ReactText`     |          |
| actions                 | `false` | 右侧滑出的操作项           | `SwipeAction[]` | `[]`     |
| height                  | `false` | 行高                       | `number`        | `60`     |
| actionWidth             | `false` | 每个操作项的宽度           | `number`        | `height` |
| onDelete                | `false` | 删除事件                   | `() => void`    |          |
| overwriteDefaultActions | `false` | 是否覆盖默认操作项         | `boolean`       | `false`  |
| containerStyle          | `false` | 滑动条样式                 | `ViewStyle`     |          |
| contentContainerStyle   | `false` | 滑动条子组件样式           | `ViewStyle`     |          |

### SwipeAction

| 属性            | 必填    | 说明           | 类型         | 默认值 |
| --------------- | ------- | -------------- | ------------ | ------ |
| label           | `true`  | 操作项文本     | `string`     |        |
| textStyle       | `false` | 操作项文本样式 | `TextStyle`  |        |
| onPress         | `true`  | 操作项点击事件 | `() => void` |        |
| backgroundColor | `true`  | 背景色         | `string`     |        |
