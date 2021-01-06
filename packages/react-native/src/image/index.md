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
  <div style="display:flex; width: 750px">
    <div style="width: 375px;">IOS效果图</div>
    <div style="width: 375px;">Android效果图</div>
  </div>
</center>
<center>
  <figure>
    <img
      alt="默认的组件 ios"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609308002321466123.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="默认的组件 android"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609308003234279447.gif"
      style="width: 375px; border: 1px solid #ddd;"
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
  <div style="display:flex; width: 750px">
    <div style="width: 375px;">IOS效果图</div>
    <div style="width: 375px;">Android效果图</div>
  </div>
</center>
<center>
  <figure>
    <img
      alt="不需要过度 ios"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609308003290614199.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="不需要过度 android"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609308002354124101.gif"
      style="width: 375px; border: 1px solid #ddd;"
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
  <div style="display:flex; width: 750px">
    <div style="width: 375px;">IOS效果图</div>
    <div style="width: 375px;">Android效果图</div>
  </div>
</center>
<center>
  <figure>
    <img
      alt="自定义 loading 动画 ios"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609308002314736009.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="自定义 loading 动画 android"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609308002363033592.gif"
      style="width: 375px; border: 1px solid #ddd;"
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
  <div style="display:flex; width: 750px">
    <div style="width: 375px;">IOS效果图</div>
    <div style="width: 375px;">Android效果图</div>
  </div>
</center>
<center>
  <figure>
    <img
      alt="过度动画时间 ios"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609308003317675780.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="过度动画时间 android"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609308003120282114.gif"
      style="width: 375px; border: 1px solid #ddd;"
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
  <div style="display:flex; width: 750px">
    <div style="width: 375px;">IOS效果图</div>
    <div style="width: 375px;">Android效果图</div>
  </div>
</center>
<center>
  <figure>
    <img
      alt="背景颜色 ios"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609308002321466020.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="背景颜色 android"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609308002309618082.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## API

| 属性               | 必填    | 说明                     | 类型        | 默认值 |
| ------------------ | ------- | ------------------------ | ----------- | ------ |
| PlaceholderContent | `false` | loading 时的占位组件     | `ReactNode` |        |
| placeholderStyle   | `false` | loading 时的占位时的样式 | `ViewStyle` |        |
| transitionDuration | `false` | 动画过度时间             | `number`    | `400`  |
| hasTransition      | `false` | 是否需要过度动画         | `boolean`   | `true` |
