---
title: Image - 图片组件
nav:
  title: RN组件
  path: /react-native
group:
  title: 展示组件
  path: /display
---

# Image 图片组件

**_Image组件已经废弃，请直接使用`react-native-fast-image`或者`expo-image`_**

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

### 2. 是否开启点击图片预览大图功能

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

### 3. 加载不同类型的图片资源

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

export type ImageProps = FastImageProps & {
  /** 是否开启点击图片预览大图功能 */
  preview?: boolean;
};
```
