---
title: Flow - 步骤组件
nav:
  title: RN组件
  path: /react-native
group:
  title: 其他组件
  path: /other
---

# Flow 步骤组件

## 效果演示

### 1. 基本的使用

```tsx | pure
  const steps = [
    { title: '第一步', description: '测试' },
    { title: '第二步', description: '测试' },
    { title: '第三步', description: '测试' },
    { title: '第四步', description: '测试' },
  ];

  <Text>基本的使用:</Text>
  <Flow steps={steps} />
```

<center>
  <figure>
    <img
      alt="基本的使用ios"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608792806502927938.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 2. 指定进度

```tsx | pure
  const steps = [
    { title: '第一步', description: '测试' },
    { title: '第二步', description: '测试' },
    { title: '第三步', description: '测试' },
    { title: '第四步', description: '测试' },
  ];


  <Text>指定进度:</Text>
  <Flow steps={steps} current={3} />
```

<center>
  <figure>
    <img
      alt="指定进度ios"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608792806489705173.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 3. 当前状态

```tsx | pure
    const steps = [
    { title: '第一步', description: '测试' },
    { title: '第二步', description: '测试' },
    { title: '第三步', description: '测试' },
    { title: '第四步', description: '测试' },
  ];

  <Text>当前状态:</Text>
  <Flow steps={steps} current={3} status="error" />
```

<center>
  <figure>
    <img
      alt="当前状态ios"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608792806808339875.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 4. 自定义 icon

```tsx | pure
  const steps = [
    { title: '第一步', description: '测试', icon: <Icon name="user" /> },
    { title: '第二步', description: '测试' },
    { title: '第三步', description: '测试' },
    { title: '第四步', description: '测试' },
  ];

  <Text>自定义icon:</Text>
  <Flow steps={steps} current={2} />
```

<center>
  <figure>
    <img
      alt="自定义 icon ios"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608792807134659754.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 5. 自定义 render

```tsx | pure
  const steps = [
    { title: '第一步', description: '测试', stepRender: <Text>111111111111</Text> },
    {
      title: '第二步',
      description: '测试',
      stepRender: (
        <Image style={{ height: 50, width: 50, borderRadius: 25 }} source={require('../../assets/images/img-01.jpg')} />
      ),
    },
    { title: '第三步', description: '测试', label: '1' },
    { title: '第四步', description: '测试' },
  ];

  <Text>自定义render:</Text>
  <Flow steps={steps} current={2} size={50} />
```

<center>
  <figure>
    <img
      alt="自定义 render ios"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608792806506728196.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 6. 自定义线的样式

```tsx | pure
 const steps4 = [
    {
      title: '第一步',
      description: '测试',
      activeColor: 'green',
    },
    {
      title: '第二步',
      description: '测试',
    },
    { title: '第三步', description: '测试' },
    { title: '第四步', description: '测试' },
  ];

  <Text>自定义线的样式:</Text>
   <Flow steps={steps4} current={2}  />
```

<center>
  <figure>
    <img
      alt="自定义线的样式 ios"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608792806816459418.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## API

### 组件属性

| 属性    | 必填    | 说明                 | 类型                                       | 默认值    |
| ------- | ------- | -------------------- | ------------------------------------------ | --------- |
| status  | `false` | 当前的状态           | `wait` \| `process` \| `finish` \| `error` | `process` |
| steps   | `false` | 步骤的数据           | `Array<StepProps>`                         | `[]`      |
| size    | `false` | 步骤条的 icon 的大小 | `number`                                   | `px(36)`  |
| current | `false` | 当前的进度           | `number`                                   | `0`       |

### StepProps 属性

| 属性 | 必填 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- | --- |
| title | `false` | 步骤的标题 | `string` |  |
| description | `false` | 步骤的介绍 | `string` |  |
| label | `false` | 步骤条的标签 | `string` |  |
| size | `false` | 节点大小 | `number` | `px(36)` |
| iconSize | `false` | 图标大小 | `number` | `px(16)` |
| status | `false` | 图标的状态 | `wait` \| `process` \| `finish` \| `error` | `wait` |
| icon | `false` | 自定义的 icon size 会被覆盖建议使用 size 指定大小 | `ReactElement` |  |
| stepRender | `false` | 自定义组件 | `ReactElement` |  |
| active | `false` | 当前节点是否进行完全 | `boolean` | `false` |
| isCurrent | `false` | 是否为当前的进度 | `boolean` | `false` |
| isLast | `false` | 是否是最后一个 | `boolean` | `false` |
