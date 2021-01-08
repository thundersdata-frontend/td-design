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
  <div style="display:flex; width: 750px">
    <div style="width: 375px;">IOS效果图</div>
    <div style="width: 375px;">Android效果图</div>
  </div>
</center>
<center>
  <figure>
    <img
      alt="searchBar-ios1.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608868154498024610.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="searchBar-android1.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609295964900140327.png"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 2. 配置 placeholder、cancelTitle

```tsx | pure
<SearchBar placeholder="请输入酒店/关键词" cancelTitle="cancel" />
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
      alt="searchBar-ios2.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608868196958509649.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="searchBar-android2.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609295964896783936.png"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 3. 配置 placeholderPosition

```tsx | pure
<SearchBar placeholderPosition="center" />
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
      alt="searchBar-ios3.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608868215970101527.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="searchBar-android3.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609295964944013496.png"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 4. 配置 defaultValue、autoFocus

```tsx | pure
<SearchBar defaultValue="美团酒店" autoFocus />
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
      alt="searchBar-ios4.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608868232946037474.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="searchBar-android4.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609295964898615254.png"
      style="width: 375px; border: 1px solid #ddd;"
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
  <div style="display:flex; width: 750px">
    <div style="width: 375px;">IOS效果图</div>
    <div style="width: 375px;">Android效果图</div>
  </div>
</center>
<center>
  <figure>
    <img
      alt="searchBar-ios5.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608868245196272524.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="searchBar-android5.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609295964936167824.png"
      style="width: 375px; border: 1px solid #ddd;"
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
