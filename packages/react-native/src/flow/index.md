---
title: Flow - 步骤组件
nav:
  title: RN组件
  path: /react-native
group:
  title: Other
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
  <div style="display:flex; width: 750px">
    <div style="width: 375px;">IOS效果图</div>
    <div style="width: 375px;">Android效果图</div>
  </div>
</center>
<center>
  <figure>
    <img
      alt="基本的使用ios"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608792806502927938.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="基本的使用android"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609322268519598354.png"
      style="width: 375px; border: 1px solid #ddd;"
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
  <div style="display:flex; width: 750px">
    <div style="width: 375px;">IOS效果图</div>
    <div style="width: 375px;">Android效果图</div>
  </div>
</center>
<center>
  <figure>
    <img
      alt="指定进度ios"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608792806489705173.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="指定进度android"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609322269534258319.png"
      style="width: 375px; border: 1px solid #ddd;"
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
  <div style="display:flex; width: 750px">
    <div style="width: 375px;">IOS效果图</div>
    <div style="width: 375px;">Android效果图</div>
  </div>
</center>
<center>
  <figure>
    <img
      alt="当前状态ios"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608792806808339875.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="当前状态android"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609322268527335770.png"
      style="width: 375px; border: 1px solid #ddd;"
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
  <div style="display:flex; width: 750px">
    <div style="width: 375px;">IOS效果图</div>
    <div style="width: 375px;">Android效果图</div>
  </div>
</center>
<center>
  <figure>
    <img
      alt="自定义 icon ios"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608792807134659754.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="自定义 icon android"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609322268527335889.png"
      style="width: 375px; border: 1px solid #ddd;"
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
  <div style="display:flex; width: 750px">
    <div style="width: 375px;">IOS效果图</div>
    <div style="width: 375px;">Android效果图</div>
  </div>
</center>
<center>
  <figure>
    <img
      alt="自定义 render ios"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608792806506728196.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="自定义 render android"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609322268570613795.png"
      style="width: 375px; border: 1px solid #ddd;"
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
  <div style="display:flex; width: 750px">
    <div style="width: 375px;">IOS效果图</div>
    <div style="width: 375px;">Android效果图</div>
  </div>
</center>
<center>
  <figure>
    <img
      alt="自定义线的样式 ios"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608792806816459418.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="自定义线的样式 android"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609323035453174473.png"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## API

### 组件属性

| 属性    | 必填    | 说明                 | 类型                                       | 默认值    |
| ------- | ------- | -------------------- | ------------------------------------------ | --------- |
| status  | `flase` | 当前的状态           | `wait` \| `process` \| `finish` \| `error` | `process` |
| steps   | `flase` | 步骤的数据           | `Array<StepProps>`                         | `[]`      |
| size    | `flase` | 步骤条的 icon 的大小 | `number`                                   | `px(36)`  |
| current | `flase` | 当前的进度           | `number`                                   | `0`       |

### StepProps 属性

| 属性 | 必填 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- | --- |
| title | `flase` | 步骤的标题 | `string` |  |
| description | `flase` | 步骤的介绍 | `string` |  |
| label | `flase` | 步骤条的标签 | `string` |  |
| size | `flase` | 当前节点大小会覆盖全局的 size | `number` | `px(36)` |
| status | `flase` | 图标的状态 | `wait` \| `process` \| `finish` \| `error` | `wait` |
| icon | `flase` | 自定义的 icon size 会被覆盖建议使用 size 指定大小 | `ReactElement` |  |
| stepRender | `flase` | 自定义组件 | `ReactElement` |  |
| activeColor | `flase` | 活动时的颜色 | `string` | `px(36)` |
