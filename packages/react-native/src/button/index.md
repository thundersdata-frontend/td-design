---
title: Button - 按钮组件
nav:
  title: RN组件
  path: /react-native
group:
  title: 交互组件
  path: /interaction
  order: 8
---

# Button 按钮组件

## 效果演示

### 1. 默认效果

```tsx | pure
<Button title="按钮" onPress={() => Alert.alert('hello, Button')} />
```

<center>
  <figure>
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643094661379223377.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 2. type='secondary'

```tsx | pure
<Button title="按钮" type="secondary" onPress={() => Alert.alert('hello, Button')} />
```

<center>
  <figure>
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643094817445413324.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 3. loading 状态（不响应点击事件）

```tsx | pure
<Button title="按钮" loading onPress={() => Alert.alert('hello, Button')} />
```

<center>
  <figure>
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643094995808075383.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 4. 禁用按钮

```tsx | pure
<Button title="按钮" disabled onPress={() => Alert.alert('hello, Button')} />
```

<center>
  <figure>
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643095088204101287.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 5. 设置按钮宽度

```tsx | pure
<Button title="按钮" width="80%" onPress={() => Alert.alert('hello, Button')} />
```

<center>
  <figure>
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643095170934109065.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 6. 设置按钮圆角大小

```tsx | pure
<Button title="按钮" borderRadius={20} onPress={() => Alert.alert('hello, Button')} />
```

<center>
  <figure>
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643095234774951875.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## API

组件属性继承`SpacingProps`，其余属性如下：

| 属性         | 必填    | 说明         | 类型                            | 默认值    |
| ------------ | ------- | ------------ | ------------------------------- | --------- |
| title        | `true`  | 按钮文字内容 | `ReactNode`                     |           |
| type         | `false` | 按钮展示类型 | `primary` \| `secondary`        | `primary` |
| disabled     | `false` | 是否失效     | `boolean`                       | `false`   |
| loading      | `false` | 是否加载中   | `boolean`                       |           |
| onPress      | `true`  | 按钮点击事件 | `() => void`                    |           |
| width        | `false` | 按钮宽度     | `number` \| `string`            | `100%`    |
| borderRadius | `false` | 圆角大小     | `number`                        | `px(4)`   |
| bordered     | `false` | 是否显示边框 | `boolean`                       | `true`    |
| size         | `false` | 按钮大小     | `default` \| `small` \| `large` | `default` |
| style        | `false` | 自定义样式   | `ViewStyle`                     |           |
