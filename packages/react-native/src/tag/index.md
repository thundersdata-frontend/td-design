---
title: Tag - 标签组件
nav:
  title: RN 组件
  path: /react-native
group:
  title: Display
  path: /display
---

# Tag 标签组件

## 效果演示

### 1. 大中小标签默认效果

```tsx | pure
<Flex justifyContent="space-around">
  <Tag size="small">magenta</Tag>
  <Tag>magenta</Tag>
  <Tag size="large">magenta</Tag>
</Flex>
```

<center>
  <figure>
    <img
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643253782367453494.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 2. 自定义背景色

```jsx | pure
<Flex justifyContent="space-between">
  <Tag backgroundColor="func200" text="标签" />
  <Tag backgroundColor="func300" text="标签" />
  <Tag backgroundColor="func500" text="小标签标签" />
</Flex>
```

<center>
  <figure>
    <img
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643253837366314688.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 3. 自定义文字颜色

```jsx | pure
<Flex justifyContent="space-between">
  <Tag color="func200" text="标签" />
  <Tag color="func300" text="标签" />
  <Tag color="func500" text="标签" />
</Flex>
```

<center>
  <figure>
    <img
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643253869655478919.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 4. 镂空标签

```jsx | pure
<Flex justifyContent="space-between">
  <Tag backgroundColor="func200" ghost text="标签" />
  <Tag backgroundColor="func300" ghost text="标签" />
  <Tag backgroundColor="func500" ghost text="标签" />
</Flex>
```

<center>
  <figure>
    <img
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643253904141084290.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 5. disabled 效果

```jsx | pure
<Flex justifyContent="space-between">
  <Tag disabled text="标签" />
  <Tag backgroundColor="func300" disabled text="标签" />
  <Tag backgroundColor="func500" disabled text="标签" />
</Flex>
```

<center>
  <figure>
    <img
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643253934714157704.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 6. 选中效果

```jsx | pure
<Flex justifyContent="space-between">
  <Tag selected text="标签" />
  <Tag backgroundColor="func300" selected text="标签" />
  <Tag backgroundColor="func500" selected text="标签" />
</Flex>
```

<center>
  <figure>
    <img
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643253992253997438.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 7. 可删除效果

```jsx | pure
<Flex justifyContent="space-between">
  <Tag closable text="标签" />
  <Tag backgroundColor="func300" closable text="标签" />
  <Tag backgroundColor="func500" closable text="标签" />
</Flex>
```

<center>
  <figure>
    <img
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643254041176615517.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## API

| 属性     | 必填    | 说明               | 类型                          | 默认值   |
| -------- | ------- | ------------------ | ----------------------------- | -------- |
| size     | `false` | 标签的大小         | `large`\| `small` \| `middle` | `middle` |
| text     | `false` | 指定标签文本       | `string`                      |          |
| ghost    | `false` | 是否背景镂空       | `boolean`                     | `false`  |
| disabled | `false` | 设置禁用           | `boolean`                     | `false`  |
| closable | `false` | 是否可关闭         | `boolean`                     | `false`  |
| selected | `false` | 设置标签的选中状态 | `boolean`                     | `false`  |
| onClose  | `false` | 点击关闭的回调函数 | `() => void`                  |          |
| onSelect | `false` | 点击标签的回调函数 | `(selected: boolean) => void` |          |
