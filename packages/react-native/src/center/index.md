---
title: Center - 居中组件
nav:
  title: RN组件
  path: /react-native
group:
  title: 基础组件
  path: /basic
---

# Center 居中组件

Center 是 flex 布局的一个封装，它的子组件永远处于水平和垂直居中。

## 效果演示

### 1. 默认效果

```tsx | pure
<Center>
  <Box width={90} height={90} backgroundColor="func500" />
</Center>
```

<center>
  <figure>
    <img
      alt="card-ios1"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643096226546921536.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 2. 在指定了宽高的容器中居中

```tsx | pure
<Box width={'100%'} height={400} borderWidth={1} borderColor={'border'}>
  <Center>
    <Box width={100} height={100} backgroundColor="func200" />
  </Center>
</Box>
```

<center>
  <figure>
    <img
      alt="card-ios1"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643096237451002191.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## API

| 属性   | 必填    | 说明 | 类型                 | 默认值 |
| ------ | ------- | ---- | -------------------- | ------ |
| width  | `false` | 宽度 | `string` \| `number` | `100%` |
| height | `false` | 高度 | `string` \| `number` | `100%` |
