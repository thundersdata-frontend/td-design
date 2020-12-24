---
title: SearchBar - 搜索栏组件
nav:
  title: RN组件
  path: /react-native
group:
  title: Interaction
  path: /interaction
---

# SearchBar 搜索栏组件

## 效果演示

### 1. 默认配置

```tsx | pure
<SearchBar onChange={value => console.log(value)} onSearch={value => console.log(value)} />
```

<center>
  <div style={{ display: 'flex', width: 750 }}>
    <div style={{ width: 375 }}>IOS效果图</div>
    <div style={{ width: 375 }}>Android效果图</div>
  </div>
</center>
<center>
  <figure>
    <img
      alt=""
      src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607430991524&di=24c0bf75a6d0efeff1c48e13829eca72&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201308%2F23%2F220651x9b0h4kru904ozre.jpg"
      style={{ width: 375, marginRight: 10, border: "1px solid #ddd" }}
    />
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608798857007797492.jpg"
      style={{ width: 375, border: "1px solid #ddd" }}
    />
  </figure>
</center>

### 2. 配置 placeholder、cancelTitle

```tsx | pure
<SearchBar placeholder="请输入酒店/关键词" cancelTitle="cancel" />
```

<center>
  <div style={{ display: 'flex', width: 750 }}>
    <div style={{ width: 375 }}>IOS效果图</div>
    <div style={{ width: 375 }}>Android效果图</div>
  </div>
</center>
<center>
  <figure>
    <img
      alt=""
      src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607430991524&di=24c0bf75a6d0efeff1c48e13829eca72&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201308%2F23%2F220651x9b0h4kru904ozre.jpg"
      style={{ width: 375, marginRight: 10, border: "1px solid #ddd" }}
    />
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608798861125503950.jpg"
      style={{ width: 375, border: "1px solid #ddd" }}
    />
  </figure>
</center>

### 3. 配置 placeholderPosition

```tsx | pure
<SearchBar placeholderPosition="center" />
```

<center>
  <div style={{ display: 'flex', width: 750 }}>
    <div style={{ width: 375 }}>IOS效果图</div>
    <div style={{ width: 375 }}>Android效果图</div>
  </div>
</center>
<center>
  <figure>
    <img
      alt=""
      src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607430991524&di=24c0bf75a6d0efeff1c48e13829eca72&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201308%2F23%2F220651x9b0h4kru904ozre.jpg"
      style={{ width: 375, marginRight: 10, border: "1px solid #ddd" }}
    />
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608798871355084340.jpg"
      style={{ width: 375, border: "1px solid #ddd" }}
    />
  </figure>
</center>

### 4. 配置 defaultValue、autoFocus

```tsx | pure
<SearchBar defaultValue="美团酒店" autoFocus />
```

<center>
  <div style={{ display: 'flex', width: 750 }}>
    <div style={{ width: 375 }}>IOS效果图</div>
    <div style={{ width: 375 }}>Android效果图</div>
  </div>
</center>
<center>
  <figure>
    <img
      alt=""
      src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607430991524&di=24c0bf75a6d0efeff1c48e13829eca72&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201308%2F23%2F220651x9b0h4kru904ozre.jpg"
      style={{ width: 375, marginRight: 10, border: "1px solid #ddd" }}
    />
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608798879017368259.jpg"
      style={{ width: 375, border: "1px solid #ddd" }}
    />
  </figure>
</center>

### 5. 配置 children

```tsx | pure
<SearchBar inputContainerStyle={{ flex: 6 }} containerStyle={{ height: px(40) }}>
  <>
    <Flex flex={1}>
      <Icon name="left" />
    </Flex>
    <Flex flex={2} height={px(40)} justifyContent="center">
      <Text>请入住</Text>
    </Flex>
  </>
</SearchBar>
```

<center>
  <div style={{ display: 'flex', width: 750 }}>
    <div style={{ width: 375 }}>IOS效果图</div>
    <div style={{ width: 375 }}>Android效果图</div>
  </div>
</center>
<center>
  <figure>
    <img
      alt=""
      src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607430991524&di=24c0bf75a6d0efeff1c48e13829eca72&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201308%2F23%2F220651x9b0h4kru904ozre.jpg"
      style={{ width: 375, marginRight: 10, border: "1px solid #ddd" }}
    />
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608798886520115912.jpg"
      style={{ width: 375, border: "1px solid #ddd" }}
    />
  </figure>
</center>

## API

| 属性                | 必填    | 说明                      | 类型                      | 默认值    |
| ------------------- | ------- | ------------------------- | ------------------------- | --------- |
| placeholder         | `false` | 搜索框的 placeholder      | `string`                  | `搜索`    |
| showCancelButton    | `false` | 是否展示取消按钮          | `boolean`                 | `true`    |
| allowClear          | `false` | 是否允许清除              | `boolean`                 | `true`    |
| disabled            | `false` | 搜索框是否禁用            | `boolean`                 | `false`   |
| defaultValue        | `false` | 搜索框的默认值            | `string`                  |           |
| placeholderPosition | `false` | 搜索框 placeholder 的位置 | `left` \| `center`        | `left`    |
| autoFocus           | `false` | 是否自动 focus            | `boolean`                 | `false`   |
| cancelTitle         | `false` | 取消文字                  | `string`                  | `取消`    |
| returnKeyType       | `false` | 键盘下方的按钮类型        | `ReturnKeyTypeOptions`    | `search`  |
| keyboardType        | `false` | 弹出键盘类型              | `KeyboardTypeOptions`     | `default` |
| containerStyle      | `false` | 最外层 view 的样式        | `ViewStyle`               |           |
| inputContainerStyle | `false` | 包裹 input 的 view 的样式 | `ViewStyle`               |           |
| onChange            | `false` | 输入改变时的回调          | `(text: string) => void`  |           |
| onSearch            | `false` | 提交时的搜索              | `(text: string) => void;` |           |
