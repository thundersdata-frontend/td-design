---
title: Image - 图片组件
nav:
  title: RN组件
  path: /react-native
group:
  title: Display
  path: /display
---

# Image 图片组件

## 效果演示

### 1. 默认的组件

```tsx | pure
<Image
  source={{
    uri: 'https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608532848489915741.gif',
  }}
  style={{ width: 100, height: 100 }}
/>
```

<center>
  <div style={{ display: 'flex', width: 750 }}>
    <div style={{ width: 375 }}>IOS效果图</div>
    <div style={{ width: 375 }}>Android效果图</div>
  </div>
</center>
<center>
  <figure>
    <img
      alt="默认的"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608532848489915741.gif"
      style={{ width: 375, marginRight: 10, border: "1px solid #ddd" }}
    />
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608534218320203382.gif"
      style={{ width: 375, border: "1px solid #ddd" }}
    />
  </figure>
</center>

### 2. 不需要过度

```tsx | pure
<Image
  source={{
    uri: 'https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1000',
  }}
  style={{ width: 100, height: 100 }}
  hasTransition={false}
/>
```

<center>
  <div style={{ display: 'flex', width: 750 }}>
    <div style={{ width: 375 }}>IOS效果图</div>
    <div style={{ width: 375 }}>Android效果图</div>
  </div>
</center>
<center>
  <figure>
    <img
      alt="不需要过度"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608532848612992856.gif"
      style={{ width: 375, marginRight: 10, border: "1px solid #ddd" }}
    />
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608534218325644646.gif"
      style={{ width: 375, border: "1px solid #ddd" }}
    />
  </figure>
</center>

### 3. 自定义 loading 动画

```tsx | pure
<Image
  source={{
    uri: 'https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1000',
  }}
  style={{ width: 100, height: 100 }}
  PlaceholderContent={<ActivityIndicator />}
/>
```

<center>
  <div style={{ display: 'flex', width: 750 }}>
    <div style={{ width: 375 }}>IOS效果图</div>
    <div style={{ width: 375 }}>Android效果图</div>
  </div>
</center>
<center>
  <figure>
    <img
      alt="自定义 loading 动画"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608532848481941678.gif"
      style={{ width: 375, marginRight: 10, border: "1px solid #ddd" }}
    />
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608534218325121298.gif"
      style={{ width: 375, border: "1px solid #ddd" }}
    />
  </figure>
</center>

### 4. 过度动画时间

```tsx | pure
<Image
  source={{
    uri: 'https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1000',
  }}
  style={{ width: 100, height: 100 }}
  transitionDuration={4000}
  PlaceholderContent={<ActivityIndicator />}
/>
```

<center>
  <div style={{ display: 'flex', width: 750 }}>
    <div style={{ width: 375 }}>IOS效果图</div>
    <div style={{ width: 375 }}>Android效果图</div>
  </div>
</center>
<center>
  <figure>
    <img
      alt="过度动画时间"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608532848537418029.gif"
      style={{ width: 375, marginRight: 10, border: "1px solid #ddd" }}
    />
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608534218348756659.gif"
      style={{ width: 375, border: "1px solid #ddd" }}
    />
  </figure>
</center>

### 5. 背景颜色

```tsx | pure
<Image
  source={{
    uri: 'https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=1000',
  }}
  style={{ width: 100, height: 100 }}
  PlaceholderContent={<ActivityIndicator />}
/>
```

<center>
  <div style={{ display: 'flex', width: 750 }}>
    <div style={{ width: 375 }}>IOS效果图</div>
    <div style={{ width: 375 }}>Android效果图</div>
  </div>
</center>
<center>
  <figure>
    <img
      alt="过度动画时间"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608532848479055912.gif"
      style={{ width: 375, marginRight: 10, border: "1px solid #ddd" }}
    />
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608534218320194384.gif"
      style={{ width: 375, border: "1px solid #ddd" }}
    />
  </figure>
</center>

## API

| 属性               | 必填  | 说明                     | 类型      | 默认值 |
| ------------------ | ----- | ------------------------ | --------- | ------ |
| PlaceholderContent | false | loading 时的占位组件     | ReactNode | 无     |
| placeholderStyle   | false | loading 时的占位时的样式 | ViewStyle | 无     |
| transitionDuration | false | 动画过度时间             | number    | 400    |
| hasTransition      | false | 是否需要过度动画         | boolean   | true   |