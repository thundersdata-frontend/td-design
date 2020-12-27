---
title: Pagination - 分页器组件
nav:
  title: RN组件
  path: /react-native
group:
  title: Feedback
  path: /feedback
---

# Pagination 分页器组件

## 效果演示

### 1. 常规的分页器

```tsx | pure
<Pagination
  total={66}
  onChange={e => {
    Alert.alert(e + '');
  }}
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
      alt="常规的分页器 ios"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608881146349127706.gif"
      style={{ width: 375, marginRight: 10, border: "1px solid #ddd" }}
    />
    <img
      alt="常规的分页器 android"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608881146349033316.gif"
      style={{ width: 375, border: "1px solid #ddd" }}
    />
  </figure>
</center>

### 2. 手动设置设置 page

```tsx | pure
<Pagination
  page={3}
  total={66}
  onChange={e => {
    Alert.alert(e + '');
  }}
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
      alt="手动设置设置 page ios"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608881148036817049.gif"
      style={{ width: 375, marginRight: 10, border: "1px solid #ddd" }}
    />
    <img
      alt="手动设置设置 page android"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608881148036746642.gif"
      style={{ width: 375, border: "1px solid #ddd" }}
    />
  </figure>
</center>

### 3. 自定义按钮

```tsx | pure
<Pagination
  total={66}
  onChange={e => {
    Alert.alert(e + '');
  }}
  prevButtonRender={isFirstPage => {
    return isFirstPage ? <Text>isFirstPage</Text> : <Text>notFirstPage</Text>;
  }}
  nextButtonRender={isLastPage => {
    return isLastPage ? <Text>LastPage</Text> : <Text>notLastPage</Text>;
  }}
  counterRender={(currentindex, totalPages) => {
    return <Text>{currentindex + '/' + totalPages}</Text>;
  }}
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
      alt="自定义按钮 ios"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608881147347790962.gif"
      style={{ width: 375, marginRight: 10, border: "1px solid #ddd" }}
    />
    <img
      alt="自定义按钮 android"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608881146813836814.gif"
      style={{ width: 375, border: "1px solid #ddd" }}
    />
  </figure>
</center>

## API

| 属性             | 必填  | 说明             | 类型                                                  | 默认值 |
| ---------------- | ----- | ---------------- | ----------------------------------------------------- | ------ |
| page             | false | 当前页数         | number                                                | 1      |
| total            | false | 总数量           | number                                                | 无     |
| pageSize         | false | 一页的数量       | number                                                | 10     |
| onChange         | false | 页面改变的事件   | (page: number) => void                                | 无     |
| prevButtonText   | false | 上一页按钮文字   | string                                                | 上一页 |
| nextButtonText   | false | 下一页按钮文字   | string                                                | 下一页 |
| prevButtonRender | false | 自定义上一页按钮 | (isFirstPage: boolean) => ReactElement                | 无     |
| nextButtonRender | false | 自定义下一页按钮 | (isLastPage: boolean) => ReactElement                 | 无     |
| counterRender    | false | 自定义计数器     | (current: number, totalpages: number) => ReactElement | 无     |
