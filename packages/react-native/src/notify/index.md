---
title: Notify - 提示组件
nav:
  title: RN组件
  path: /react-native
group:
  title: Feedback
  path: /feedback
---

# Notify 提示组件

## 效果演示

### 1. 消息提示

```tsx | pure
<Button title="info" onPress={() => Notify.info({ content: '你收到一条抢购消息，请注意查收' })} />
```

<center>
  <figure>
    <img
      alt="notify-ios1.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607588591151277948.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 2. 带关闭效果

```tsx | pure
<Button
  title="close"
  onPress={() =>
    Notify.info({
      content: '你收到一条抢购消息，请注意查收',
      autoClose: false,
      onClose: () => console.log(222),
    })
  }
/>
```

<center>
  <figure>
    <img
      alt="notify-ios2.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607588857557958788.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 3. 带点击跳转效果

```tsx | pure
<Button
  title="press"
  onPress={() =>
    Notify.info({
      content: '你收到一条抢购消息，请注意查收',
      onPress: () => navigation.navigate('BoxDemo'),
      autoClose: false,
    })
  }
/>
```

<center>
  <figure>
    <img
      alt="notify-ios3.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607589050992593024.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 4. 成功提示

```tsx | pure
<Button title="success" onPress={() => Notify.success({ content: '购买成功' })} />
```

<center>
  <figure>
    <img
      alt="notify-ios4.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643185000193572589.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 5. 失败提示

```tsx | pure
<Button title="fail" onPress={() => Notify.fail({ content: '对不起，操作失败' })} />
```

<center>
  <figure>
    <img
      alt="notify-ios5.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643185067327550797.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## API

| 属性      | 必填    | 说明                 | 类型         | 默认值 |
| --------- | ------- | -------------------- | ------------ | ------ |
| autoClose | `false` | 是否自动关闭提示     | `boolean`    | `true` |
| duration  | `false` | 提示显示时长（毫秒） | `number`     | `3000` |
| content   | `false` | 提示框内容           | `ReactNode`  |        |
| onClose   | `false` | 提示框关闭后回调     | `() => void` |        |
| onPress   | `false` | 提示框点击后回调     | `() => void` |        |

`duration` 有两个常量值：

- Notify.SHORT = 3000
- Notify.LONG = 5000
