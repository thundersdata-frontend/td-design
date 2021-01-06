---
title: Share - 分享组件
nav:
  title: RN组件
  path: /react-native
group:
  title: Interaction
  path: /interaction
---

# Share 分享组件

## 效果演示

### 1. 支持所有分享

```tsx | pure
<Share
  visible={visible}
  onCancel={() => setVisible(false)}
  onRefresh={() => console.log('123')}
  onShareSms={() => console.log('1')}
  onShareFriends={() => console.log('1')}
  onShareMoments={() => console.log('2')}
  onShareWeibo={() => console.log('3')}
  onShareAlipay={() => console.log('4')}
  onShareDingtalk={() => console.log('5')}
  onShareQQ={() => console.log('6')}
  onShareZhihu={() => console.log('7')}
  onShareQQMail={() => console.log('8')}
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
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608257540826683640.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609072325331365422.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 2. 只分享微信和微博

```tsx | pure
<Share
  visible={visible}
  onCancel={() => setVisible(false)}
  onRefresh={() => console.log('123')}
  onShareFriends={() => console.log('1')}
  onShareMoments={() => console.log('2')}
  onShareWeibo={() => console.log('3')}
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
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608257643797039788.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609072405865685231.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 3. 自定义分享应用

```tsx | pure
<Share
  visible={visible}
  onCancel={() => setVisible(false)}
  onRefresh={() => console.log('123')}
  onShareFriends={() => console.log('1')}
  onShareMoments={() => console.log('2')}
  onShareWeibo={() => console.log('3')}
  extraShares={[{ label: 'QQ', icon: <QQ />, schema: 'mqq://', onPress: onShareQQ }]}
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
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608257825295838178.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609072607094852184.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 4. 自定义操作项

```tsx | pure
<Share
  visible={visible}
  onCancel={() => setVisible(false)}
  onRefresh={() => console.log('123')}
  onShareSms={() => console.log('1')}
  onShareFriends={() => console.log('1')}
  onShareMoments={() => console.log('2')}
  onShareWeibo={() => console.log('3')}
  onShareAlipay={() => console.log('4')}
  onShareDingtalk={() => console.log('5')}
  onShareQQ={() => console.log('6')}
  onShareZhihu={() => console.log('7')}
  onShareQQMail={() => console.log('8')}
  extraActions={[
    {
      label: '截图',
      icon: <Icon type="material" name="add-a-photo" size={60} color="#000" />,
      onPress: () => console.log('9'),
    },
  ]}
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
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1608258219008870837.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609072710139050200.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## API

### Share

| 属性            | 必填    | 说明             | 类型            | 默认值 |
| --------------- | ------- | ---------------- | --------------- | ------ |
| visible         | `false` | 是否显示操作面板 | `boolean`       |        |
| onCancel        | `true`  | 关闭操作面板     | `() => void`    |        |
| cancelText      | `false` | 关闭文字         | `string`        | `取消` |
| refreshText     | `false` | 刷新文字         | `string`        | `刷新` |
| onRefresh       | `true`  | 刷新页面         | `() => void`    |        |
| extraShares     | `false` | 自定义分享项     | `ShareItem[]`   | `[]`   |
| extraActions    | `false` | 自定义操作项     | `ShareAction[]` | `[]`   |
| onShareSms      | `false` | 分享到短信       | `() => void`    |        |
| onShareFriends  | `false` | 分享给微信好友   | `() => void`    |        |
| onShareMoments  | `false` | 分享到朋友圈     | `() => void`    |        |
| onShareWeibo    | `false` | 分享到微博       | `() => void`    |        |
| onShareAlipay   | `false` | 分享到支付宝     | `() => void`    |        |
| onShareDingtalk | `false` | 分享到钉钉       | `() => void`    |        |
| onShareQQ       | `false` | 分享到 QQ        | `() => void`    |        |
| onShareZhihu    | `false` | 分享到知乎       | `() => void`    |        |
| onShareQQMail   | `false` | 分享到 QQ 邮箱   | `() => void`    |        |

### ShareItem

| 属性    | 必填    | 说明              | 类型         | 默认值 |
| ------- | ------- | ----------------- | ------------ | ------ |
| appName | `false` | 应用名称          | `string`     |        |
| label   | `true`  | 文本              | `string`     |        |
| icon    | `true`  | 图标              | `Icon`       |        |
| schema  | `true`  | 应用的 url schema | `string`     |        |
| onPress | `true`  | 点击事件处理函数  | `() => void` |        |

### ShareAction

| 属性    | 必填   | 说明             | 类型         | 默认值 |
| ------- | ------ | ---------------- | ------------ | ------ |
| label   | `true` | 文本             | `string`     |        |
| icon    | `true` | 图标             | `Icon`       |        |
| onPress | `true` | 点击事件处理函数 | `() => void` |        |

_`Icon`组件大小允许自定义，但是取 40 比较合适。_
