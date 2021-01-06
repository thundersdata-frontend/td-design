---
title: Timeline - 时间轴组件
nav:
  title: RN组件
  path: /react-native
group:
  title: Other
  path: /other
---

# Timeline 时间轴组件

## 效果演示

### 1. 基本的使用

```tsx | pure
  const steps = [
    { title: '第一步', description: '测试', date: '12-12', time: '10:10' },
    { title: '第二步', description: '测试', date: '12-12', time: '10:10' },
    { title: '第三步', description: '测试', date: '12-12', time: '10:10' },
    { title: '第四步', description: '测试', date: '12-12', time: '10:10' },
  ];

  <Text>基本:</Text>
  <WhiteSpace />
  <Timeline steps={steps} />
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
      alt="基本的使用 ios"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608969367949171039.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="基本的使用 android"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609322787135843225.png"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 2. 竖向滑动

```tsx | pure
  const steps = [
    { title: '第一步', description: '测试', date: '12-12', time: '10:10' },
    { title: '第二步', description: '测试', date: '12-12', time: '10:10' },
    { title: '第三步', description: '测试', date: '12-12', time: '10:10' },
    { title: '第四步', description: '测试', date: '12-12', time: '10:10' },
  ];

  <Text>竖向滑动:</Text>
  <WhiteSpace />
  <View style={{ height: 100 }}>
    <Timeline steps={steps} />
  </View>
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
      alt="竖向滑动 ios"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608969351910158373.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="竖向滑动 android"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609322796619329781.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 3. 向下排序：

```tsx | pure
  const steps = [
    { title: '第一步', description: '测试', date: '12-12', time: '10:10' },
    { title: '第二步', description: '测试', date: '12-12', time: '10:10' },
    { title: '第三步', description: '测试', date: '12-12', time: '10:10' },
    { title: '第四步', description: '测试', date: '12-12', time: '10:10' },
  ];

  <Text>竖向滑动:</Text>
  <WhiteSpace />
  <Timeline steps={steps} direction="down" />
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
      alt="向下排序 ios"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608969368086888554.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="向下排序 android"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609322791005284007.png"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 4. 自定义节点

```tsx | pure
  const steps: StepProps[] = [
    {
      title: '第一步',
      description: '测试',
      date: '12-12',
      time: '10:10',
      iconRender: <Icon name="user"></Icon>,
    },
    {
      title: '第二步',
      description: '测试',
      date: '12-12',
      time: '10:10',
      contentRender: <Text>111</Text>,
    },
    { title: '第三步', description: '测试', date: '12-12', time: '10:10', leftRender: <Text>222</Text> },
    { title: '第四步', description: '测试', date: '12-12', time: '10:10', status: 'error' },
  ];
  <Text>自定义节点:</Text>
  <WhiteSpace />
  <Timeline steps={steps}  />
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
      alt="向下排序 自定义节点"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608969368135619260.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="向下排序 自定义节点"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609323112189366412.png"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## API

### 组件属性

| 属性      | 必填    | 说明           | 类型               | 默认值 |
| --------- | ------- | -------------- | ------------------ | ------ |
| steps     | `true`  | 时间轴节点数据 | `Array<StepProps>` | `[]`   |
| direction | `false` | 时间轴排序方向 | `down` \| `up`     | `up`   |

### StepProps

| 属性          | 必填    | 说明                       | 类型                                       | 默认值 |
| ------------- | ------- | -------------------------- | ------------------------------------------ | ------ |
| title         | `false` | 时间轴节点的标题           | `string`                                   |        |
| description   | `false` | 时间轴节点的副标题         | `string`                                   |        |
| status        | `false` | 图标的状态                 | `wait` \| `error` \| `finish` \| `process` |        |
| date          | `false` | 时间轴节点左边的日期       | `string`                                   |        |
| time          | `false` | 时间轴节点左边的时间       | `string`                                   |        |
| iconRender    | `false` | 时间轴节点自定义 icon      | `ReactElement`                             |        |
| contentRender | `false` | 时间轴节点自定义右边的内容 | `ReactElement`                             |        |
| leftRender    | `false` | 时间轴节点自定义左边的内容 | `ReactElement`                             |        |
