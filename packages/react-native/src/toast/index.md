---
title: Toast - 提示组件
nav:
  title: RN组件
  path: /react-native
group:
  title: Feedback
  path: /feedback
---

# Toast 提示组件

## 效果演示

### 1. 消息提示

```tsx | pure
<Button title="info" onPress={() => Toast.info({ content: '你收到一条抢购消息，请注意查收' })} />
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
      alt="toast-ios1.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607588591151277948.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="toast-android1.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609299661500330387.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 2. 带关闭效果

```tsx | pure
<Button
  title="close"
  onPress={() =>
    Toast.info({
      content: '你收到一条抢购消息，请注意查收',
      autoClose: false,
      onClose: () => console.log(222),
    })
  }
/>
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
      alt="toast-ios2.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607588857557958788.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="toast-android2.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609299661528911084.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 3. 带点击跳转效果

```tsx | pure
<Button
  title="press"
  onPress={() =>
    Toast.info({
      content: '你收到一条抢购消息，请注意查收',
      onPress: () => navigation.navigate('BoxDemo'),
      autoClose: false,
    })
  }
/>
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
      alt="toast-ios3.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607589050992593024.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="toast-android3.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609299661543276848.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 4. 成功提示

```tsx | pure
<Button title="success" onPress={() => Toast.success({ content: '已成功添加到购物车' })} />
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
      alt="toast-ios4.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607589298973422492.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="toast-android4.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609299661498880210.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 5. 失败提示

```tsx | pure
<Button title="fail" onPress={() => Toast.fail({ content: '对不起，操作失败' })} />
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
      alt="toast-ios5.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607589484168289240.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="toast-android5.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609299661500628607.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 6. 加载中提示

```tsx | pure
<Button title="loading" onPress={() => Toast.loading({ content: '正在加载' })} />
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
      alt="toast-ios6.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607589572422903052.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="toast-android6.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609299661501951682.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 7. 提交中提示

```tsx | pure
<Button title="submitting" onPress={() => Toast.submitting()} />
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
      alt="toast-ios7.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607589662990656446.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="toast-android7.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609299662546927582.gif"
      style="width: 375px; border: 1px solid #ddd;"
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

- Toast.SHORT = 3000
- Toast.LONG = 5000
