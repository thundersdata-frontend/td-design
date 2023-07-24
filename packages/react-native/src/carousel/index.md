---
title: Carousel - 轮播组件
nav:
  title: RN组件
  path: /react-native
group:
  title: 展示组件
  path: /display
---

# Carousel 轮播组件

## 效果演示

### 1. 默认配置

```tsx | pure
<Carousel>
  <Image source={require('../../assets/images/img-01.jpg')} />
  <Image source={require('../../assets/images/img-02.jpg')} />
  <Image source={require('../../assets/images/img-03.jpeg')} />
</Carousel>
```

<center>
  <figure>
    <img
      alt="Carousel-ios1.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607584871809874524.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 2. 宽度 200，高度 100

```tsx | pure
<Carousel width={px(200)} height={px(100)}>
  <Image source={require('../../assets/images/img-01.jpg')} />
  <Image source={require('../../assets/images/img-02.jpg')} />
  <Image source={require('../../assets/images/img-03.jpeg')} />
</Carousel>
```

<center>
  <figure>
    <img
      alt="Carousel-ios2.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607585106049348222.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 3. 轮播时长为 1000 毫秒

```tsx | pure
<Carousel duration={1000}>
  <Image source={require('../../assets/images/img-01.jpg')} />
  <Image source={require('../../assets/images/img-02.jpg')} />
  <Image source={require('../../assets/images/img-03.jpeg')} />
</Carousel>
```

<center>
  <figure>
    <img
      alt="Carousel-ios5.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607585607849541264.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 4. 修改指示器颜色

```tsx | pure
<Carousel dotColor="gold">
  <Image source={require('../../assets/images/img-01.jpg')} />
  <Image source={require('../../assets/images/img-02.jpg')} />
  <Image source={require('../../assets/images/img-03.jpeg')} />
</Carousel>
```

<center>
  <figure>
    <img
      alt="Carousel-ios8.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607586190454474657.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## API

| 属性             | 必填    | 说明               | 类型        | 默认值        |
| ---------------- | ------- | ------------------ | ----------- | ------------- |
| auto             | `false` | 是否自动滚动       | `boolean`   | `true`        |
| width            | `false` | 轮播图宽度         | `number`    | `deviceWidth` |
| height           | `false` | 轮播图高度         | `number`    | `320`         |
| duration         | `false` | 轮播时长（毫秒）   | `number`    | `2000`        |
| indicatorEnabled | `false` | 是否显示滚动指示器 | `boolean`   | `true`        |
| indicatorSize    | `false` | 指示器大小         | `number`    | `10`          |
| activeColor      | `false` | 原点选中时颜色     | `string`    | `#fff`        |
| inactiveColor    | `false` | 原点未选中时颜色   | `string`    | `#fff`        |
| align            | `false` | 指示器布局方式。   | `AlignType` | `center`      |

`AlignType`的类型如下：

```ts
type AlignType = 'left' | 'center' | 'right';
```
