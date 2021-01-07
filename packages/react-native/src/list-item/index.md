---
title: ListItem - 列表展示项组件
nav:
  title: RN组件
  path: /react-native
group:
  title: Display
  path: /display
---

# ListItem 列表展示项组件

## 效果演示

### 1. 默认效果

```jsx | pure

<ListItem
  title="主标题主标题主标题主标题主标题主标题"
  onPress={() => { console.log(111);}}
/>
<ListItem title="主标题主标题主标题主标题主标题主标题" brief="主标题下面的副标题主标题下面的副标题" />

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
      alt="listItem-ios1.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607588623849055290.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="listItem-android1.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609211369316883550.png"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 2. 左侧添加缩略图、右侧添加图片效果

```jsx | pure
<ListItem
  title="主标题"
  brief="主标题下面的副标题"
  thumb="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606285430559&di=c907f729d36be1a5d18b0a05fd2ac86a&imgtype=0&src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201902%2F13%2F20190213001818_qzcmb.thumb.400_0.png"
/>
<ListItem
  title="extra为Image"
  thumb="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606285430559&di=c907f729d36be1a5d18b0a05fd2ac86a&imgtype=0&src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201902%2F13%2F20190213001818_qzcmb.thumb.400_0.png"
  extra={
    <Image
      source={{
        uri: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606285430559&di=c907f729d36be1a5d18b0a05fd2ac86a&imgtype=0&src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201902%2F13%2F20190213001818_qzcmb.thumb.400_0.png',
      }}
      style={{ width: 40, height: 40 }}
    />
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
      alt="listItem-ios2.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607589469700710282.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="listItem-android2.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609211369308136693.png"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 3. 右侧组件自定义和指定箭头方向效果

```jsx | pure
<ListItem title="主标题" brief="主标题下面的副标题" extra={<Icon name="user" />} />
<ListItem title="主标题" brief="主标题下面的副标题" extra={<Switch />} />
<ListItem title="主标题" brief="主标题下面的副标题" arrow="down" />
<ListItem title="主标题" brief="主标题下面的副标题" arrow="horizontal" />
<ListItem title="主标题" brief="主标题下面的副标题" arrow="up" />
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
      alt="listItem-ios3.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607589526883025441.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="listItem-android3.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609211369313006651.png"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 4. 右侧组件的三种对齐方式以及副标题的换行

```jsx | pure
<ListItem
  title="主标题"
  brief="主标题下面的副标题主标题下面的副标题下面的副标题副标题下面的副标题"
  arrow="horizontal"
  extra="请选择"
  align="flex-start"
  wrap
/>
<ListItem
  title="主标题"
  brief="主标题下面的副标题主标题下面的副标题下面的副标题副标题下面的副标题"
  arrow="horizontal"
  wrap
  extra="请选择"
/>
<ListItem
  title="主标题"
  brief="主标题下面的副标题主标题下面的副标题"
  arrow="horizontal"
  extra="请选择"
  align="flex-end"
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
      alt="listItem-ios4.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607589557023127738.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="listItem-android4.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609211369311281084.png"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 5. 右侧文字换行和过长省略效果、以及添加 required 效果

```jsx | pure
<ListItem title="长内容" wrap extra="httpsos.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png" required />
<ListItem title="长内容" extra="httpsos.alipayobjects.com/rmsportal/mOoPurdIfmcuqtr.png" arrow="horizontal" />
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
      alt="listItem-ios5.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607589586181106551.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="listItem-android5.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609211369298207318.png"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## API

| 属性     | 必填    | 说明                       | 类型                                      | 默认值   |
| -------- | ------- | -------------------------- | ----------------------------------------- | -------- |
| title    | `true`  | 主标题                     | `ReactNode`                               |          |
| brief    | `false` | 主标题下面的副标题         | `ReactNode`                               |          |
| extra    | `false` | 右面的文字或组件           | `ReactNode`                               |          |
| thumb    | `false` | 缩略图                     | `ReactNode`                               |          |
| onPress  | `false` | 按下的回调函数             | `() => void`                              |          |
| style    | `false` | 自定义 style               | `ViewStyle`                               |          |
| required | `false` | 是否必填，必填显示红色\*号 | `boolean`                                 | `false`  |
| wrap     | `false` | 是否折行                   | `boolean`                                 | `false`  |
| align    | `false` | 子元素垂直对齐方式         | `flex-start` \| `center` \| `flex-end`    | `center` |
| arrow    | `false` | 右侧箭头指示方向           | `horizontal` \| `down` \| `up` \| `empty` |          |
