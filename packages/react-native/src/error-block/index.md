---
title: ErrorBlock - 异常捕获组件
nav:
  title: RN组件
  path: /react-native
group:
  title: Display
  path: /display
---

# ErrorBlock 异常捕获组件

内置了两种场景：

- 代码出错，包括 hooks 内出错、render 内出错，这时候会显示默认的应用出错的界面
- 网络请求出错，即代码层面通过`throw new Error(JSON.stringify({type: 'network'}))`，这时候会显示内置的网络请求失败的出错界面

具体测试代码可以参见 `exmaple` 里面的 `ErrorBlockDemo.tsx` 文件

## 效果演示

### 1. 默认异常

```tsx | pure
<Box flex={1}>
  <ErrorBlock onError={onError} onRefresh={onRefresh}>
    <Demo1 />
  </ErrorBlock>
</Box>
```

<center>
  <figure>
    <img
      alt="empty-ios1.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643165357318249571.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 2. 网络连接异常

```tsx | pure
<Empty customImg={<Image source={require('../../assets/img/pic_empty.png')} />} />
```

<center>
  <figure>
    <img
      alt="empty-ios2.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643165225985160065.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 3. 自定义异常展示

```tsx | pure
<Box height={300}>
  <ErrorBlock
    onError={onError}
    customNode={
      <Box
        height={200}
        padding="x4"
        justifyContent={'center'}
        alignItems="center"
        borderWidth={1}
        borderColor="func600"
      >
        <Text>我是自定义错误展示</Text>
      </Box>
    }
  >
    <Demo1 />
  </ErrorBlock>
</Box>
```

<center>
  <figure>
    <img
      alt="empty-ios2.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643165587210140943.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## API

| 属性       | 必填    | 说明                 | 类型                                           | 默认值 |
| ---------- | ------- | -------------------- | ---------------------------------------------- | ------ |
| customNode | `false` | 自定义出错时渲染组件 | `ReactNode`                                    |        |
| onError    | `false` | 异常捕获的处理逻辑   | `(error: Error, errorInfo: ErrorInfo) => void` |        |
| onRefresh  | `false` | 重新刷新逻辑         | `() => void`                                   |        |
