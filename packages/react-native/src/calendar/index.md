---
title: Calendar - 日历组件
nav:
  title: RN组件
  path: /react-native
group:
  title: Other
  path: /other
---

# Calendar 日历组件

## 效果演示

### 1. 基础 Calendar

```tsx | pure
<Calendar />
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
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609137338819827656.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609138047236504895.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 2. 配置 markedDates

```tsx | pure
<Calendar
  markedDates={{
    '2020-12-03': { disabled: true },
    '2020-12-04': { disabled: true, dotColor: '#7DC455' },
    '2020-12-11': { dotColor: theme.colors.primaryColor, selected: true },
    '2020-12-13': { dotColor: theme.colors.primaryColor, selected: true, selectedColor: '#7DC455' },
    '2020-12-17': { dotColor: '#7DC455', textColor: 'red' },
    '2020-12-25': { dotColor: '#7DC455' },
  }}
  onDayPress={date => console.log(date, 'onDayPress')}
  onMonthChange={date => console.log(date, 'onMonthChange')}
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
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609213294210202748.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609213294212785268.png"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 3. 配置 firstDay

```tsx | pure
<Calendar firstDay={1} />
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
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609125525450993973.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609126205601911922.png"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 4. 配置 hideExtraDays

```tsx | pure
<Calendar hideExtraDays />
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
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609125532566559388.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609126211842932544.png"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 5. 配置 showSixWeeks

```tsx | pure
<Calendar showSixWeeks />
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
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609125535449832660.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609126216710219722.png"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 6. 配置 minDate 和 maxDate

```tsx | pure
<Calendar minDate="2020-12-05" maxDate="2020-12-29" />
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
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609125540158660005.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609126221218439090.png"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 7. CalendarList

```tsx | pure
<CalendarList
  markingType="period"
  markedDates={{
    '2020-12-03': {
      startingDay: true,
      selected: true,
      extra: '起',
    },
    '2020-12-04': { selected: true },
    '2020-12-05': { selected: true },
    '2020-12-06': { selected: true },
    '2020-12-07': { selected: true },
    '2020-12-08': { selected: true },
    '2020-12-09': { selected: true },
    '2020-12-10': {
      endingDay: true,
      selected: true,
      extra: '止',
    },
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
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609137415401507983.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609138753142475149.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 8. Agenda

```tsx | pure
<Agenda
  data={[
    { time: '09:00', title: '上班打卡' },
    { time: '12:00', title: '吃午饭啦' },
  ]}
  keyExtractor={(_, index) => `${index}`}
  markedDates={{ '2020-12-03': { dotColor: theme.colors.success }, '2020-12-13': { dotColor: 'red' } }}
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
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609137440241431421.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609138401967788236.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## API

### CalendarHeader

| 属性 | 必填 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- | --- |
| firstDay | `false` | 一周以哪天开头，周一为 1， 周二为 2 以此类推，默认周日开头 | `number` | `0` |
| monthFormat | `false` | 月份格式化 | `string` | `YYYY年MM月` |
| showArrowLeft | `false` | 是否展示左边箭头 | `boolean` | `true` |
| showArrowRight | `false` | 是否展示右边箭头 | `boolean` | `true` |
| showDown | `false` | 展示向上还是向下按钮 | `boolean` | `true` |
| headerStyle | `false` | header 的样式 | `ViewStyle` |  |
| onPressArrowLeft | `false` | 按下左边按钮回调 | `(month: Dayjs) => void` |  |
| onPressArrowRight | `false` | 按下右边按钮回调 | `(month: Dayjs) => void` |  |
| onPressArrowDown | `false` | 按下向下按钮回调 | `(month: Dayjs) => void` |  |
| onPressArrowUp | `false` | 按下向上按钮回调 | `(month: Dayjs) => void` |  |

### Calendar

| 属性 | 必填 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- | --- |
| current | `false` | 需要展示的当前月份 | `Dayjs` | `dayjs()` |
| minDate | `false` | 可选择的最小的日期 | `CurDateType` |  |
| maxDate | `false` | 可选择的最大的日期 | `CurDateType` |  |
| markedDates | `false` | 被标记的日期 | `{ [date: string]: PeriodMarking \| DotMarking }` | `{}` |
| markingType | `false` | 标记类型 | `dot` \| `period` | `dot` |
| enableSwipeMonths | `false` | 是否可以滑动切换月份 | `boolean` | `true` |
| hideExtraDays | `false` | 是否展示当前月份之外的天数 | `boolean` | `false` |
| showSixWeeks | `false` | 是否每个月都展示 6 个星期（只有当`hideExtraDays` = `false`时生效） | `boolean` | `false` |
| style | `false` | calendar 整体的补充样式 | `Animated.AnimateStyle<ViewStyle>` |  |
| monthWrapperStyle | `false` | month 外层的补充样式 | `Animated.AnimateStyle<ViewStyle>` |  |
| contentStyle | `false` | content 的补充样式 | `Animated.AnimateStyle<ViewStyle>` |  |
| onDayPress | `false` | 点击日期的回调 | `(date: DateObject) => void` |  |
| onMonthChange | `false` | 月份变化回调 | `(month: string) => void` |  |

### CalendarList

| 属性              | 必填    | 说明               | 类型      | 默认值        |
| ----------------- | ------- | ------------------ | --------- | ------------- |
| pastScrollRange   | `false` | 最多往前推算几个月 | `number`  | `12`          |
| futureScrollRange | `false` | 最多往后推算几个月 | `number`  | `12`          |
| horizontal        | `false` | 是否水平           | `boolean` | `false`       |
| calendarWidth     | `false` | 日历宽度           | `number`  | `deviceWidth` |
| calendarHeight    | `false` | 日历高度           | `number`  | `420`         |

### Agenda

| 属性         | 必填    | 说明                       | 类型                                     | 默认值 |
| ------------ | ------- | -------------------------- | ---------------------------------------- | ------ |
| data         | `false` | 日程数据                   | `ItemT[]`                                | `[]`   |
| renderItem   | `false` | 每个日程的渲染             | `ListRenderItem<ItemT>`                  |        |
| keyExtractor | `true`  | 标记每条数据的唯一性的 key | `(item: ItemT, index: number) => string` |        |

### PeriodMarking

| 属性        | 必填    | 说明           | 类型        | 默认值 |
| ----------- | ------- | -------------- | ----------- | ------ |
| disabled    | `false` | 是否禁用       | `boolean`   |        |
| selected    | `false` | 是否选中       | `boolean`   |        |
| startingDay | `false` | 是否是开始日期 | `boolean`   |        |
| endingDay   | `false` | 是否是结束日期 | `boolean`   |        |
| extra       | `false` | 额外参数       | `ReactNode` |        |

### DotMarking

| 属性          | 必填    | 说明           | 类型      | 默认值 |
| ------------- | ------- | -------------- | --------- | ------ |
| disabled      | `false` | 是否禁用       | `boolean` |        |
| selected      | `false` | 是否选中       | `boolean` |        |
| textColor     | `false` | 日期的颜色     | `string`  |        |
| selectedColor | `false` | 选中的背景颜色 | `string`  |        |
| dotColor      | `false` | 点的颜色       | `string`  |        |

## 补充说明

### 1. CurDateType 枚举值如下

```tsx | pure
type CurDateType = 'string' | 'Date' | 'Dayjs';
```

### 2. DateObject 对象如下

```tsx | pure
{
  day: number;
  dateString: string;
  month: number;
  timestamp: number;
  year: number;
}
```

### 3. Item 对象如下

```tsx | pure
{
  time: string;
  title: string;
  onPress?: () => void;
}
```
