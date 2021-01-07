---
title: Swiper - 轮播组件
nav:
  title: RN组件
  path: /react-native
group:
  title: Display
  path: /display
---

# Swiper 轮播组件

## 效果演示

### 1. 默认配置

```tsx | pure
<Swiper>
  <Image source={require('../../assets/images/img-01.jpg')} />
  <Image source={require('../../assets/images/img-02.jpg')} />
  <Image source={require('../../assets/images/img-03.jpeg')} />
</Swiper>
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
      alt="swiper-ios1.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607584871809874524.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="swiper-android1.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609224784649569708.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 2. 宽度 200，高度 100

```tsx | pure
<Swiper width={px(200)} height={px(100)}>
  <Image source={require('../../assets/images/img-01.jpg')} />
  <Image source={require('../../assets/images/img-02.jpg')} />
  <Image source={require('../../assets/images/img-03.jpeg')} />
</Swiper>
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
      alt="swiper-ios2.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607585106049348222.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="swiper-android2.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609227009933305440.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 3. 指示器位置靠上，居左

```tsx | pure
<Swiper width={px(200)} height={px(100)} direction="top" align="left">
  <Image source={require('../../assets/images/img-01.jpg')} />
  <Image source={require('../../assets/images/img-02.jpg')} />
  <Image source={require('../../assets/images/img-03.jpeg')} />
</Swiper>
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
      alt="swiper-ios3.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607585219854042589.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="swiper-android3.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609227015241690060.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 4. 循环滚动为 false

```tsx | pure
<Swiper loop={false}>
  <Image source={require('../../assets/images/img-01.jpg')} />
  <Image source={require('../../assets/images/img-02.jpg')} />
  <Image source={require('../../assets/images/img-03.jpeg')} />
</Swiper>
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
      alt="swiper-ios4.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607585787622959805.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="swiper-android4.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609227021507692685.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 5. 轮播时长为 1000 毫秒

```tsx | pure
<Swiper duration={1000}>
  <Image source={require('../../assets/images/img-01.jpg')} />
  <Image source={require('../../assets/images/img-02.jpg')} />
  <Image source={require('../../assets/images/img-03.jpeg')} />
</Swiper>
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
      alt="swiper-ios5.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607585607849541264.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="swiper-android5.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609227012921787456.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 6. 垂直滚动

```tsx | pure
<Swiper horizontal={false}>
  <Image source={require('../../assets/images/img-01.jpg')} />
  <Image source={require('../../assets/images/img-02.jpg')} />
  <Image source={require('../../assets/images/img-03.jpeg')} />
</Swiper>
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
      alt="swiper-ios6.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607585911161208451.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="swiper-android6.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609227022456767840.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 7. 指示器位置靠下，居左

```tsx | pure
<Swiper horizontal={false} direction="left" align="bottom">
  <Image source={require('../../assets/images/img-01.jpg')} />
  <Image source={require('../../assets/images/img-02.jpg')} />
  <Image source={require('../../assets/images/img-03.jpeg')} />
</Swiper>
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
      alt="swiper-ios7.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607586027795186876.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="swiper-android7.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609227018370844355.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 8. 修改指示器颜色

```tsx | pure
<Swiper dotColor="gold">
  <Image source={require('../../assets/images/img-01.jpg')} />
  <Image source={require('../../assets/images/img-02.jpg')} />
  <Image source={require('../../assets/images/img-03.jpeg')} />
</Swiper>
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
      alt="swiper-ios8.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607586190454474657.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="swiper-android8.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609227019936969430.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## API

| 属性              | 必填    | 说明               | 类型                                   | 默认值        |
| ----------------- | ------- | ------------------ | -------------------------------------- | ------------- |
| auto              | `false` | 是否自动滚动       | `boolean`                              | `true`        |
| loop              | `false` | 是否循环滚动       | `boolean`                              | `true`        |
| width             | `false` | 轮播图宽度         | `number`                               | `deviceWidth` |
| height            | `false` | 轮播图高度         | `number`                               | `320`         |
| duration          | `false` | 轮播时长（毫秒）   | `number`                               | `3500`        |
| horizontal        | `false` | 是否水平滚动       | `boolean`                              | `true`        |
| paginationEnabled | `false` | 是否显示滚动指示器 | `boolean`                              | `true`        |
| dotSize           | `false` | 指示器大小         | `number`                               | `10`          |
| dotColor          | `false` | 指示器颜色         | `string`                               | `#fff`        |
| direction         | `false` | 指示器位置。       | `top` \| `left` \| `right` \| `bottom` | `bottom`      |
| align             | `false` | 指示器布局方式。   | `AlignType`                            | `center`      |

**关于`direction`和`align`属性的说明**

- `direction`:

  - horizontal=true 时可选值`left` \| `right`，表示指示器在轮播图左侧或者右侧
  - horizontal=false 时可选值`top` \| `bottom`，表示指示器在轮播图顶部或者底部

- `align`:

  - horizontal=true 时可选值`left` \| `center` \| `right`，表示指示器靠左/居中/靠右
  - horizontal=false 时可选值`top` \| `middle` \| `bottom`，表示指示器靠上/居中/靠下

`AlignType`的类型如下：

```ts
type AlignType = 'left' | 'top' | 'center' | 'middle' | 'right' | 'bottom';
```
