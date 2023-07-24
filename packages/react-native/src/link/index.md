---
title: Link - 外链组件
nav:
  title: RN组件
  path: /react-native
group:
  title: 其他组件
  path: /other
---

# Link 外链组件

该组件暴露了允许在 app 内唤起其他应用的方法。如发送短信、打电话、发邮件、打开外链、打开系统设置。

## 效果演示

### 1. 发送邮件

```tsx | pure
<Button title="发送邮件" onPress={() => Link.email('929483857@qq.com')} />
```

### 2. 打开系统设置

```tsx | pure
<Button title="打开系统设置" onPress={() => Link.settings()} />
```

### 3. 发送短信

```tsx | pure
<Button title="发送短信" onPress={() => Link.sms('+8617681820821')} />
```

### 4. 打电话

```tsx | pure
<Button title="打电话" onPress={() => Link.call('+8617681820821')} />
```

### 5. 打开网址

```tsx | pure
<Button title="打开网址" onPress={() => Link.url('https://www.baidu.com/')} />
```

## API

### Link.email(email: string)

### Link.settings()

### Link.sms(phoneNumber: string)

### Link.call(phoneNumber: string)

### Link.url(url: string)
