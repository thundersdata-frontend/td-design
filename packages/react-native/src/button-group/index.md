---
title: ButtonGroup - 按钮组组件
nav:
  title: RN组件
  path: /react-native
group:
  title: Interaction
  path: /interaction
---

# ButtonGroup 按钮组组件

## 效果演示

### 1. 默认效果

```tsx | pure
<ButtonGroup
  options={[
    {
      label: 'test1',
      onPress: () => {
        console.log(111);
      },
    },
    { label: 'test2' },
    { label: 'test3' },
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
      alt="buttonGroup-ios1.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607765928867208467.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="buttonGroup-android1.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609294178773624484.png"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 2.设置不同 Size 的按钮组

```tsx | pure
<WhiteSpace />
<ButtonGroup
  options={[{ label: 'L' }, { label: 'R' }]}
  size='xl'
  containerStyle={{ width: '75%' }}
/>
<WhiteSpace />
<ButtonGroup
  options={[{ label: 'L' }, { label: 'R' }]}
  containerStyle={{ width: '50%' }}
/>
<WhiteSpace />
<ButtonGroup
  options={[{ label: 'L' }, { label: 'R' }]}
  size='xs'
  containerStyle={{ width: '25%' }}
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
      alt="buttonGroup-ios2.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607766005198871809.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="buttonGroup-android2.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609294178774222473.png"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 3. 自定义样式

```tsx | pure
<ButtonGroup
  options={[{ label: 'test1', style: { backgroundColor: 'pink' } }, { label: 'test2' }, { label: 'test3' }]}
  disabledItems={[1]}
  containerStyle={{ padding: px(2), backgroundColor: '#005DFF', borderRadius: px(4) }}
/>
<WhiteSpace />
<ButtonGroup
  options={[{ label: '年' }, { label: '月' }, { label: '周' }]}
  size='s'
  containerStyle={{ width: '50%' }}
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
      alt="buttonGroup-ios3.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607766073303038285.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="buttonGroup-android3.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609294178765950631.png"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 4. 内容为自定义图标（组件）

```tsx | pure
<ButtonGroup
  options={[
    {
      label: <Icon name="star" />,
    },
    {
      label: <Icon name="star" />,
    },
    {
      label: <Icon name="star" />,
    },
    {
      label: <Icon name="star" />,
    },
    {
      label: <Icon name="star" />,
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
      alt="buttonGroup-ios4.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607766030643665923.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt="buttonGroup-android4.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609294178776176865.png"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## API

| 属性 | 必填 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- | --- |
| options | `true` | 指定可选项 | `Option[]` |  |
| size | `false` | 尺寸 | `xxs` \| `xs` \| `s` \| `m` \| `l` \| `xl` \| `xxl` | `m` |
| disabledItems | `false` | 设置禁用的项，值为 options 的数组下标 | `number[]` |  |
| activeIndex | `false` | 默认处于点击状态的 Item，值为 options 的数组下标 | `number` |  |
| itemStyle | `false` | 自定义 Item 样式 | `ViewStyle` |  |
| containerStyle | `false` | 自定义容器样式 | `ViewStyle` |  |

_`size`的值对应的具体大小定义在`theme`文件的`spacing`。_

### Option 类型

```ts
interface Option {
  /** 文本或者组件 */
  label: string | ReactElement<IconProps>;
  /** 按下的回调函数 */
  onPress?: () => void;
  /** 自定义样式 */
  style?: StyleProp<ViewStyle>;
}
```
