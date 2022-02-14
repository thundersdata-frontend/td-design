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

### 1. 显示在顶部

```jsx | pure
<Button title="top" onPress={() => (keyRef.current = Toast.top({ content: '提示内容1111' }))} />
```

<center>
  <figure>
    <img
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643254392066258035.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 2. 显示在中间

```jsx | pure
<Button title="middle" onPress={() => (keyRef.current = Toast.middle({ content: '提示内容222222' }))} />
```

<center>
  <figure>
    <img
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643254458823053269.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 3. 显示在底部

```jsx | pure
<Button title="bottom" onPress={() => (keyRef.current = Toast.bottom({ content: '提示内容333333333' }))} />
```

<center>
  <figure>
    <img
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643254509842898005.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 4. 显示加载中效果

```jsx | pure
<Button title="loading" onPress={() => (keyRef.current = Toast.process())} />
```

<center>
  <figure>
    <img
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643254564477916502.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 5. 弹窗中再弹出提示

```jsx | pure
<Button title="内容在底部" onPress={() => setVisible1(true)} />
<Modal visible={visible1} onClose={() => setVisible1(false)} position="bottom">
  <Box height={190}>
    <Text variant="p0" color="gray500">
      我是内容
    </Text>
    <WhiteSpace />
    <Button title="submitting" onPress={() => (keyRef.current = Toast.process('提交中...'))} />
  </Box>
</Modal>
```

<center>
  <figure>
    <img
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643254676457406203.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 6. 修改提示显示时长

```jsx | pure
<Button title="top" onPress={() => (keyRef.current = Toast.top({ content: '提示内容1111', duration: Toast.LONG }))} />
```

<center>
  <figure>
    <img
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643254765688963868.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## API

### Toast.top({ duration, content}: { duration: number, content: ReactNode })

### Toast.middle({ duration, content}: { duration: number, content: ReactNode })

### Toast.bottom({ duration, content}: { duration: number, content: ReactNode })

### Toast.process(content: ReactNode)

`duration` 有三个常量值：

- Toast.SHORT = 3000
- Toast.LONG = 5000
- Toast.INFINITY = INFINITY
