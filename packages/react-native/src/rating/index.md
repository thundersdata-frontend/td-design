---
title: Rating - 评分组件
nav:
  title: RN组件
  path: /react-native
group:
  title: Form
  path: /form
---

# Rating 评分组件

使用本组件需要单独安装：**yarn add @td-design/react-native-rating**

## 效果演示

### 1. 点击评分

```tsx | pure
<TapRating count={5} selectedColor="red" />
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
      alt="rating-ios1.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608031082750770825.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="rating-android1.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609235377841533046.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 2. 不显示评分对应的文字

```tsx | pure
<TapRating count={5} showReview={false} />
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
      alt="rating-ios2.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608031167591520069.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="rating-android2.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609235377854020924.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 3. 滑动评分向上取整

```tsx | pure
const [rating, setRating] = useState(0);

<Text>您选择的分数是：{rating}</Text>
<SwipeRating
  count={5}
  fractions={0}
  defaultRating={0}
  onFinishRating={position => {
    setRating(position);
  }}
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
      alt="rating-ios3.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608031383343799559.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="rating-android3.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609235377857629126.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 4. 滑动评分保留小数

```tsx | pure
const [rating, setRating] = useState(2.5);

<Text>您选择的分数是：{rating}</Text>
<SwipeRating
  count={5}
  defaultRating={2.5}
  fractions={2}
  onFinishRating={position => {
    setRating(position);
  }}
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
      alt="rating-ios4.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608031551235116500.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="rating-android4.gif"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609235377853538076.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## API

### TapRating

| 属性 | 必填 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- | --- |
| defaultRating | `false` | 默认分数 | `number` |  |
| count | `false` | 评分总数 | `number` | `5` |
| showReview | `false` | 是否显示文字 | `boolean` | `true` |
| reviewSize | `false` | 文字大小 | `number` | `25` |
| reviewColor | `false` | 文字颜色 | `string` |  |
| reviews | `false` | 文字数组 | `string[]` | `['非常差', '很差', '一般', '很好', '非常好']` |
| size | `false` | 评分大小 | `number` | `40` |
| disabled | `false` | 是否禁用 | `boolean` | `false` |
| starStyle | `false` | 评分样式 | `ImageStyle` |  |
| selectedColor | `false` | 评分选中颜色 | `string` | `gold` |
| unselectedColor | `false` | 评分未选中颜色 | `string` | `gray` |
| outRangeScale | `false` | 评分点击时缩放大小 | `number` |  |
| onFinishRating | `false` | 评分结束时的回调事件 | `(rating: number) => void` | `1.2` |

### SwipeRating

| 属性            | 必填    | 说明                      | 类型                       | 默认值 |
| --------------- | ------- | ------------------------- | -------------------------- | ------ |
| ratingBgColor   | `false` | 评分底色                  | `string`                   |        |
| ratingFillColor | `false` | 评分填充色                | `string`                   |        |
| count           | `false` | 评分总数                  | `number`                   | `5`    |
| strokeColor     | `false` | 评分边框色                | `string`                   |        |
| size            | `false` | 评分大小                  | `number`                   | `40`   |
| disabled        | `false` | 是否禁用                  | `boolean`                  |        |
| defaultRating   | `false` | 默认选中评分              | `number`                   | `2.5`  |
| minValue        | `false` | 评分最小值                | `number`                   | `0`    |
| fractions       | `false` | 小数位数。传 0 时向上取整 | `number`                   | `2`    |
| onFinishRating  | `false` | 评分结束时的回调事件      | `(rating: number) => void` |        |

## 主题相关属性

| 属性                         | 说明               | 普通模式            | 暗黑模式                 |
| ---------------------------- | ------------------ | ------------------- | ------------------------ |
| rating_background            | 背景色             | `palette.white`     | `darkPalette.darkBlue`   |
| rating_selected              | 选中色             | `palette.yellow`    | `darkPalette.yellow`     |
| rating_unselected            | 未选中的颜色       | `palette.lightGray` | `darkPalette.lightWhite` |
| rating_swipe_background      | 滑动时的背景色     | `palette.yellow`    | `darkPalette.darkBlue`   |
| rating_swipe_star_stroke     | 星星的边框颜色     | `palette.white`     | `darkPalette.yellow`     |
| rating_swipe_fill_background | 滑动时填充的背景色 | `palette.yellow`    | `darkPalette.yellow`     |

_palette 和 darkPalette 的定义详见[内置主题](/react-native/theme)_
