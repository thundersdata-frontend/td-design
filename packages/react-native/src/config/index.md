---
title: Theme - 主题
nav:
  title: RN 组件
  path: /react-native
group:
  title: Theme
  path: /theme
---

# Theme 主题

## 距离

| 名称  | 说明   | 值   |
| ----- | ------ | ---- |
| `xxs` | 特别小 | `3`  |
| `xs`  | 一般小 | `4`  |
| `s`   | 小     | `8`  |
| `m`   | 中等   | `12` |
| `l`   | 大     | `16` |
| `xl`  | 一般大 | `20` |
| `xxl` | 特别大 | `24` |

## 圆角

| 名称     | 说明              | 值  |
| -------- | ----------------- | --- |
| `corner` | 大圆角            | `8` |
| `icon`   | Icon 组件圆角大小 | `4` |
| `base`   | 基础圆角          | `4` |
| `tag`    | Tag 组件圆角大小  | `3` |

## 媒体查询断点

| 名称          | 说明   | 值     |
| ------------- | ------ | ------ |
| `phone`       | 手机   | `0`    |
| `tablet`      | 平板   | `768`  |
| `largeTablet` | 大平板 | `1024` |

## 默认模式调色板

| 名称                 | 说明     | 值                      |
| -------------------- | -------- | ----------------------- |
| `red`                | 红色     | `#F4443C`               |
| `lightRed`           | 淡红色   | `#FBF5F5`               |
| `orange`             | 橘色     | `#F86E21`               |
| `lightOrange`        | 淡橘色   | `#FFF7E3`               |
| `green`              | 绿色     | `#52C41A`               |
| `black`              | 黑色     | `#000000`               |
| `white`              | 白色     | `#ffffff`               |
| `blue`               | 蓝色     | `#005DFF`               |
| `mediumBlue`         | 中度蓝   | `#1890FF`               |
| `lightBlue`          | 淡蓝色   | `#3AA3FF`               |
| `yellow`             | 黄色     | `#FFD21D`               |
| `pink`               | 粉色     | `#ff00a1`               |
| `lightPink`          | 淡粉色   | `#ECF4FF`               |
| `twentyPercentBlack` | 20%度黑  | `#rgba(0, 0, 0, 0.2)`   |
| `cyan`               | 青色     | `#E5F1FF`               |
| `dark`               | 深色     | `#333333`               |
| `lightDark`          | 浅深色   | `#666666`               |
| `gray`               | 灰色     | `#999999`               |
| `mediumGray`         | 中灰色   | `#CCCCCC`               |
| `lightGray`          | 淡灰色   | `rgba(245,245,249,0.8)` |
| `grayishGray`        | 浅灰色   | `#dddddd`               |
| `darkGray`           | 深灰色   | `#bbbbbb`               |
| `twentyPercentGray`  | 二十度灰 | `rgba(0, 0, 0, 0.2)`    |
| `fourPercentGray`    | 四十度灰 | `rgba(0, 0, 0, 0.04)`   |
| `sixtyPercentGray`   | 六十度灰 | `rgba(0, 0, 0, 0.6)`    |
| `fortyPercentWhite`  | 四十度白 | `rgba(255,255,255,0.4)` |
| `fortyPercentBlack`  | 四十度黑 | `rgba(0, 0, 0, 0.4)`    |

## 默认模式颜色

| 名称                       | 说明              | 值                   |
| -------------------------- | ----------------- | -------------------- |
| `transparent`              | 透明              | `transparent`        |
| `success`                  | 成功              | `green`              |
| `warn`                     | 警告              | `orange`             |
| `fail`                     | 失败              | `red`                |
| `link`                     | 链接              | `mediumBlue`         |
| `white`                    | 白色              | `white`              |
| `black`                    | 黑色              | `black`              |
| `primaryColor`             | 主色              | `blue`               |
| `secondaryColor`           | 渐变色（起）      | `lightBlue`          |
| `backgroundColor1`         | 背景色-1          | `cyan`               |
| `backgroundColor2`         | 背景色-2          | `lightRed`           |
| `backgroundColor3`         | 背景色-3          | `lightOrange`        |
| `backgroundColor4`         | 背景色-4          | `white`              |
| `backgroundColor5`         | 背景色-5          | `lightGray`          |
| `dangerousColor`           | 警示性颜色-1      | `red`                |
| `warningColor1`            | 警示性颜色-2      | `orange`             |
| `warningColor2`            | 警示性颜色-3      | `yellow`             |
| `primaryTextColor`         | 标题颜色          | `dark`               |
| `secondaryTextColor`       | 正文颜色          | `lightDark`          |
| `primaryTipColor`          | 提示性颜色-1      | `gray`               |
| `secondaryTipColor`        | 提示性颜色-2      | `mediumGray`         |
| `secondaryTipReverseColor` | 提示性颜色-2-反转 | `pink`               |
| `overlayColor`             | 蒙层颜色          | `twentyPercentBlack` |
| `borderColor`              | 分割线、置灰      | `darkGray`           |
| `disabledColor`            | 禁用              | `mediumGray`         |
| `disabledBgColor`          | 禁用背景          | `grayishGray`        |
| `closedBgColor`            | 关闭背景          | `darkGray`           |
| `closedTagColor`           | 关闭标签          | `twentyPercentGray`  |
| `tagBgColor`               | 标签背景          | `fourPercentGray`    |
| `tagTextColor`             | 标签文本          | `sixtyPercentGray`   |
| `rippleColor`              | ripple 背景色     | `fortyPercentWhite`  |
| `btnCoverColor`            | 按钮遮罩色        | `twentyPercentGray`  |
| `emptyBgColor`             | 空白背景          | `white`              |
| `normalBackground`         | Toast 正常背景    | `lightPink`          |
| `exceptionBackground`      | Toast 异常背景    | `lightRed`           |
| `maskBackground`           | 遮罩背景色        | `fortyPercentBlack`  |
| `keyboardIconColor`        | Keyboard 按钮颜色 | `mediumGray`         |
| `underlayColor`            | 按钮底色          | `lightGray`          |
| `lightPrimaryColor`        | 淡主色            | `eightyPercentBlue`  |

## 深色模式调色板

| 名称                     | 说明       | 值                          |
| ------------------------ | ---------- | --------------------------- |
| `red`                    | 红色       | `#F4443C`                   |
| `lightRed`               | 淡红色     | `#FBF5F5`                   |
| `orange`                 | 橘色       | `#F86E21`                   |
| `lightOrange`            | 淡橘色     | `#FFF7E3`                   |
| `green`                  | 绿色       | `#52C41A`                   |
| `black`                  | 黑色       | `#000000`                   |
| `white`                  | 白色       | `#ffffff`                   |
| `blue`                   | 蓝色       | `#005DFF`                   |
| `mediumBlue`             | 中度蓝     | `#1890FF`                   |
| `lightBlue`              | 淡蓝色     | `#3AA3FF`                   |
| `yellow`                 | 黄色       | `#FFD21D`                   |
| `pink`                   | 粉色       | `#ff00a1`                   |
| `lightPink`              | 淡粉色     | `#ECF4FF`                   |
| `twentyPercentBlack`     | 20%度黑    | `#rgba(0, 0, 0, 0.2)`       |
| `thirtyBlue`             | 三十度蓝   | `rgba(0, 93, 255, 0.3)`     |
| `eightyPercentWhite`     | 八十度白   | `rgba(255, 255, 255, 0.8)`  |
| `sixtyPercentWhite`      | 六十度白   | `rgba(255, 255, 255, 0.6)`  |
| `fortyPercentWhite`      | 四十度白   | `rgba(255, 255, 255, 0.4)`  |
| `fortyPercentBlack`      | 四十度黑   | `rgba(0, 0, 0, 0.4)`        |
| `twentyFivePercentWhite` | 二十五度白 | `rgba(255, 255, 255, 0.25)` |
| `fifteenPercentWhite`    | 十五度白   | `rgba(255, 255, 255, 0.15)` |
| `dark`                   | 深色       | `#121212`                   |
| `mediumDark`             | 中等深色   | `#141D24`                   |

## 深色模式颜色

| 名称                       | 说明              | 值                       |
| -------------------------- | ----------------- | ------------------------ |
| -------------------------- | ----------------- | --------------------     |
| `transparent`              | 透明              | `transparent`            |
| `success`                  | 成功              | `green`                  |
| `warn`                     | 警告              | `orange`                 |
| `fail`                     | 失败              | `red`                    |
| `link`                     | 链接              | `mediumBlue`             |
| `white`                    | 白色              | `white`                  |
| `black`                    | 黑色              | `black`                  |
| `primaryColor`             | 主色              | `blue`                   |
| `secondaryColor`           | 渐变色（起）      | `lightBlue`              |
| `backgroundColor1`         | 背景色-1          | `thirtyBlue`             |
| `backgroundColor2`         | 背景色-2          | `lightRed`               |
| `backgroundColor3`         | 背景色-3          | `lightOrange`            |
| `backgroundColor4`         | 背景色-4          | `mediumDark`             |
| `backgroundColor5`         | 背景色-5          | `dark`                   |
| `dangerousColor`           | 警示性颜色-1      | `red`                    |
| `warningColor1`            | 警示性颜色-2      | `orange`                 |
| `warningColor2`            | 警示性颜色-3      | `yellow`                 |
| `primaryTextColor`         | 标题颜色          | `eightyPercentWhite`     |
| `secondaryTextColor`       | 正文颜色          | `sixtyPercentWhite`      |
| `primaryTipColor`          | 提示性颜色-1      | `fortyPercentWhite`      |
| `secondaryTipColor`        | 提示性颜色-2      | `twentyFivePercentWhite` |
| `secondaryTipReverseColor` | 提示性颜色-2-反转 | `pink`                   |
| `overlayColor`             | 蒙层颜色          | `fifteenPercentWhite`    |
| `borderColor`              | 分割线、置灰      | `fifteenPercentWhite`    |
| `disabledColor`            | 禁用              | `mediumGray`             |
| `disabledBgColor`          | 禁用背景          | `grayishGray`            |
| `closedBgColor`            | 关闭背景          | `darkGray`               |
| `closedTagColor`           | 关闭标签          | `twentyPercentGray`      |
| `tagBgColor`               | 标签背景          | `fourPercentGray`        |
| `tagTextColor`             | 标签文本          | `sixtyPercentGray`       |
| `rippleColor`              | ripple 背景色     | `fortyPercentWhite`      |
| `btnCoverColor`            | 按钮遮罩色        | `twentyPercentGray`      |
| `emptyBgColor`             | 空白背景          | `black`                  |
| `normalBackground`         | Toast 正常背景    | `lightPink`              |
| `exceptionBackground`      | Toast 异常背景    | `lightRed`               |
| `maskBackground`           | 遮罩背景色        | `twentyPercentGray`      |
| `keyboardIconColor`        | Keyboard 按钮颜色 | `mediumGray`             |
| `underlayColor`            | 按钮底色          | `lightGray`              |
| `lightPrimaryColor`        | 淡主色            | `eightyPercentBlue`      |

## 文字（Text）样式

| 名称                   | 说明         | 字体 | 颜色                       |
| ---------------------- | ------------ | ---- | -------------------------- |
| `primaryTitle`         | 主标题-1     | `18` | `primaryTextColor`         |
| `primaryTitleReverse`  | 主标题-2     | `18` | `white`                    |
| `primaryBody`          | 内容性文字-1 | `16` | `primaryTextColor`         |
| `primaryBodyReverse`   | 内容性文字-2 | `16` | `white`                    |
| `secondaryBody`        | 内容性文字-3 | `14` | `primaryTextColor`         |
| `secondaryBodyReverse` | 内容性文字-4 | `14` | `secondaryTextColor`       |
| `thirdBody`            | 内容性文字-5 | `12` | `secondaryTextColor`       |
| `primaryTip`           | 提示性文字-1 | `16` | `secondaryTipColor`        |
| `primaryTipReverse`    | 提示性文字-2 | `16` | `primaryColor`             |
| `secondaryTip`         | 提示性文字-3 | `14` | `primaryColor`             |
| `secondaryTipReverse`  | 提示性文字-4 | `14` | `secondaryTipReverseColor` |
| `thirdTip`             | 提示性文字-5 | `14` | `warningColor1`            |
| `warn`                 | 警示性文字   | `16` | `dangerousColor`           |
| `primaryHelp`          | 辅助性文字-1 | `12` | `primaryTipColor`          |
| `secondaryHelp`        | 辅助性文字-2 | `10` | `primaryTipColor`          |
| `secondaryHelpReverse` | 辅助性文字-3 | `10` | `white`                    |
| `thirdHelp`            | 辅助性文字-4 | `10` | `primaryColor`             |
| `primaryDate`          | 日期-1       | `18` | `primaryTextColor`         |
| `secondaryDate`        | 日期-2       | `14` | `secondaryTipColor`        |
| `primaryNumber`        | 数字-1       | `14` | `primaryColor`             |
| `secondaryNumber`      | 数字-2       | `8`  | `white`                    |
| `failTip`              | 失败提示文字 | `10` | `fail`                     |

## 标签（Tag）样式

| 名称     | 说明     | 水平内边距 | 高度 |
| -------- | -------- | ---------- | ---- |
| `large`  | 大标签   | `xxl`      | `32` |
| `middle` | 默认标签 | `l`        | `26` |
| `small`  | 小标签   | `m`        | `20` |
