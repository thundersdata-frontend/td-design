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

### 1. 默认效果

```tsx | pure
<Image
  source={{
    uri: 'https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=100',
  }}
  style={{ width: 100, height: 100 }}
/>
```

<center>
  <figure>
    <img
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643176929385118436.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 2. 不显示加载进度

```tsx | pure
<Image
  source={{
    uri: 'https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=100',
  }}
  showProgress={false}
  style={{ width: 100, height: 100 }}
/>
```

<center>
  <figure>
    <img
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643177050340990177.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 3. 是否开启点击图片预览大图功能

```tsx | pure
<Image
  source={{
    uri: 'https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=100',
  }}
  preview={true}
  style={{ width: 100, height: 100 }}
/>
```

<center>
  <figure>
    <img
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643177163934025262.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 4. 加载不同类型的图片资源

```tsx | pure
<WhiteSpace />
<Text>本地jpg:</Text>
<Image source={require('../../assets/images/fields.jpg')} style={{ width: 300, height: 300 }} />
<WhiteSpace />
<Text>本地png:</Text>
<Image source={require('../../assets/images/logo.png')} style={{ width: 300, height: 300 }} />
<WhiteSpace />
<Text>本地gif:</Text>
<Image source={require('../../assets/images/jellyfish.gif')} style={{ width: 300, height: 300 }} />
<WhiteSpace />
<Text>本地webp:</Text>
<Image source={require('../../assets/images/fields.webp')} style={{ width: 300, height: 300 }} />
<WhiteSpace />
<Text>base64:</Text>
<Image source={{ uri: base64Img }} style={{ width: 300, height: 300 }} />
<WhiteSpace />
```

<center>
  <figure>
    <img
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643177329608859374.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## API

```ts
import { FastImageProps } from 'react-native-fast-image';

export type ImageProps = Omit<FastImageProps, 'onLoadStart' | 'onProgress' | 'onLoad' | 'onError' | 'onLoadEnd'> & {
  /** 是否显示图片加载进度 */
  showProgress?: boolean;
  /** 是否开启点击图片预览大图功能 */
  preview?: boolean;
};
```
