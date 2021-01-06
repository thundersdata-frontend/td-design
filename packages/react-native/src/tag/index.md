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

### 1. 大中小标签默认效果(type = 'default')

```tsx | pure
<Flex justifyContent="space-around">
  <Tag size="small">magenta</Tag>
  <Tag>magenta</Tag>
  <Tag size="large">magenta</Tag>
</Flex>
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
      alt="tag-ios1.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607654530734656854.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="tag-android1.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609212951658602048.png"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 2. type = 'primary'

```jsx | pure
<Flex justifyContent="space-around">
  <Tag size="small" type="primary">
    magenta
  </Tag>
  <Tag type="primary">magenta</Tag>
  <Tag size="large" type="primary">
    magenta
  </Tag>
</Flex>
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
      alt="tag-ios2.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607655455822826121.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="tag-android2.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609212951661640443.png"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 3. type = 'ghost'

```jsx | pure
<Flex justifyContent="space-around">
  <Tag size="small" type="ghost">
    magenta
  </Tag>
  <Tag type="ghost">magenta</Tag>
  <Tag size="large" type="ghost">
    magenta
  </Tag>
</Flex>
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
      alt="tag-ios3.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607655553183398723.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="tag-android3.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609212951664299163.png"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 4. 可关闭标签

```jsx | pure
<Flex justifyContent="space-around">
  <Tag size="small" closable>
    magenta
  </Tag>
  <Tag closable>magenta</Tag>
  <Tag size="large" closable>
    magenta
  </Tag>
</Flex>
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
      alt="tag-ios4.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607655486714218989.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="tag-android4.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609212951702920493.png"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 5. disabled 效果

```jsx | pure
<Flex justifyContent="space-around">
  <Tag size="small" disabled>
    magenta
  </Tag>
  <Tag disabled>magenta</Tag>
  <Tag size="large" disabled>
    magenta
  </Tag>
</Flex>
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
      alt="tag-ios5.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607655526642060372.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="tag-android5.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609212951660326989.png"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 6. 自定义颜色标签和选中效果

```jsx | pure
<Flex justifyContent="space-around">
  <Tag size="small" color="red" checked>
    red
  </Tag>
  <Tag color="red" checked>
    red
  </Tag>
  <Tag size="large" color="red">
    red
  </Tag>
</Flex>
<WhiteSpace />
<Flex justifyContent="space-around">
  <Tag size="small" color="magenta">
    magenta
  </Tag>
  <Tag color="magenta">
    magenta
  </Tag>
  <Tag size="large" color="magenta" checked>
    magenta
  </Tag>
</Flex>
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
      alt="tag-ios6.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607655581060199557.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="tag-android6.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609212951658599227.png"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## API

| 属性     | 必填    | 说明               | 类型                             | 默认值    |
| -------- | ------- | ------------------ | -------------------------------- | --------- |
| size     | `false` | 标签的大小         | `large`\| `small` \| `middle`    | `middle`  |
| type     | `false` | 设置标签类型       | `ghost`\| `primary` \| `default` | `default` |
| color    | `false` | 指定标签颜色       | `string`                         |           |
| disabled | `false` | 设置禁用           | `boolean`                        | `false`   |
| closable | `false` | 是否可关闭         | `boolean`                        | `false`   |
| checked  | `false` | 设置标签的选中状态 | `boolean`                        | `false`   |
| onClose  | `false` | 点击关闭的回调函数 | `() => void`                     |           |
| onChange | `false` | 点击标签的回调函数 | `(selected: boolean) => void`    |           |
