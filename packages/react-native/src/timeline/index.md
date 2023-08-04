---
title: Timeline - 时间轴组件
nav:
  title: RN组件
  path: /react-native
group:
  title: 其他组件
  path: /other
---

# Timeline 时间轴组件

## 效果演示

### 1. 基本的使用

```tsx | pure
  const steps = [
    {
      title: '第一步',
      description: '测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试',
      date: '12-12',
      time: '10:10',
    },
    {
      title: '第二步',
      description: '测试',
      date: '12-12',
      time: '10:11',
    },
    {
      title: '第三步',
      description: '测试',
      date: '12-12',
      time: '10:12',
    },
    {
      title: '第四步',
      description: '测试',
      date: '12-12',
      time: '10:13',
    },
  ];

  <Text>基本:</Text>
  <WhiteSpace />
  <Timeline data={steps} />
```

<center>
  <figure>
    <img
      alt="基本使用"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1690955876588834535.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 2. 横向滑动

```tsx | pure
  const steps = [
    {
      title: '第一步',
      description: '测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试',
      date: '12-12',
      time: '10:10',
    },
    {
      title: '第二步',
      description: '测试',
      date: '12-12',
      time: '10:11',
    },
    {
      title: '第三步',
      description: '测试',
      date: '12-12',
      time: '10:12',
    },
    {
      title: '第四步',
      description: '测试',
      date: '12-12',
      time: '10:13',
    },
  ];

  <Text>横向滑动:</Text>
  <Timeline data={steps} direction="horizontal" />
```

<center>
  <figure>
    <img
      alt="横向滑动"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1690955933959678499.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 3. 自定义小图标

```tsx | pure
  const steps = [
    {
      title: '第一步',
      description: '测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试',
      date: '12-12',
      time: '10:10',
    },
    {
      title: '第二步',
      description: '测试',
      date: '12-12',
      time: '10:11',
    },
    {
      title: '第三步',
      description: '测试',
      date: '12-12',
      time: '10:12',
    },
    {
      title: '第四步',
      description: '测试',
      date: '12-12',
      time: '10:13',
    },
  ];
  <Text>自定义小图标:</Text>
  <WhiteSpace />
  <Timeline data={steps} customIcon={<SvgIcon name="bells">} />
```

<center>
  <figure>
    <img
      alt="自定义小图标"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1690955975758328071.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 4. 自定义线条样式

```tsx | pure
  const steps = [
    {
      title: '第一步',
      description: '测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试',
      date: '12-12',
      time: '10:10',
    },
    {
      title: '第二步',
      description: '测试',
      date: '12-12',
      time: '10:11',
    },
    {
      title: '第三步',
      description: '测试',
      date: '12-12',
      time: '10:12',
    },
    {
      title: '第四步',
      description: '测试',
      date: '12-12',
      time: '10:13',
    },
  ];
  <Text>自定义线条样式:</Text>
  <WhiteSpace />
  <Timeline data={steps} lineStyle={{backgroundColor: 'red'}} />
```

<center>
  <figure>
    <img
      alt="自定义线条样式"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1690955996117908526.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## API

### TimelineProps

| 属性       | 必填    | 说明           | 类型                       | 默认值     |
| ---------- | ------- | -------------- | -------------------------- | ---------- |
| data       | `true`  | 时间轴节点数据 | `TimelineStepProps[]`      |            |
| direction  | `false` | 时间轴排序方向 | `horizontal` \| `vertical` | `vertical` |
| customIcon | `false` | 自定义 icon    | `ReactElement`             |            |
| lineStyle  | `false` | 线条样式       | `StyleProp<ViewStyle>`     |            |

### TimelineStepProps

| 属性        | 必填    | 说明                 | 类型     | 默认值 |
| ----------- | ------- | -------------------- | -------- | ------ |
| title       | `false` | 时间轴节点的标题     | `string` |        |
| description | `false` | 时间轴节点的副标题   | `string` |        |
| date        | `false` | 时间轴节点左边的日期 | `string` |        |
| time        | `false` | 时间轴节点左边的时间 | `string` |        |
