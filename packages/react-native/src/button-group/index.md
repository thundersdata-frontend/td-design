---
title: ButtonGroup - 按钮组组件
nav:
  title: RN 组件
  path: /react-native
group:
  title: Interaction
  path: /interaction
---

# ButtonGroup 按钮组组件

## 效果演示

### 1. 默认效果

```jsx | pure
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
  <div style={{ display: 'flex', width: 750 }}>
    <div style={{ width: 375 }}>IOS效果图</div>
    <div style={{ width: 375 }}>Android效果图</div>
  </div>
</center>
<center>
  <figure>
    <img
      alt="buttonGroup-ios1.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607591956936787291.png"
      style={{ width: 375, marginRight: 10, border: "1px solid #ddd" }}
    />
    <img
      alt="buttonGroup-android1.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607592018342750880.png"
      style={{ width: 375, border: "1px solid #ddd" }}
    />
  </figure>
</center>

### 2.设置不同 Size 的按钮组

```jsx | pure
<WhiteSpace />
<ButtonGroup
  options={[{ label: 'L' }, { label: 'R' }]}
  size='xl'
  containerStyle={{ width: '75%' }}
/>
<WhiteSpace />
<ButtonGroup
  options={[{ label: 'L' }, { label: 'R' }]}
  itemStyle={{ borderColor: 'blue', backgroundColor: 'skyblue' }}
  inactiveTextColor='blue'
  activeTextColor='blue'
  containerStyle={{ width: '50%' }}
/>
<WhiteSpace />
<ButtonGroup
  options={[{ label: 'L' }, { label: 'R' }]}
  itemStyle={{ borderColor: 'blue', backgroundColor: 'skyblue' }}
  size='xs'
  containerStyle={{ width: '25%' }}
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
      alt="buttonGroup-ios2.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607592054371003680.png"
      style={{ width: 375, marginRight: 10, border: "1px solid #ddd" }}
    />
    <img
      alt="buttonGroup-android2.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607592068645410647.png"
      style={{ width: 375, border: "1px solid #ddd" }}
    />
  </figure>
</center>

### 3. 自定义样式

```jsx | pure
<ButtonGroup
  options={[{ label: 'test1', style: { backgroundColor: 'pink' } }, { label: 'test2' }, { label: 'test3' }]}
  disabledItems={[1]}
  activeBgColor="red"
  activeTextColor="blue"
  inactiveBgColor="green"
  containerStyle={{ padding: px(2), backgroundColor: 'blue' }}
/>
<WhiteSpace />
<ButtonGroup
  options={[{ label: '年' }, { label: '月' }, { label: '周' }]}
  size='s'
  activeTextColor='blue'
  activeBgColor='pink'
  inactiveBgColor='skyblue'
  containerStyle={{ width: '50%' }}
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
      alt="buttonGroup-ios3.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607592109945519582.png"
      style={{ width: 375, marginRight: 10, border: "1px solid #ddd" }}
    />
    <img
      alt="buttonGroup-android3.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607592124402667813.png"
      style={{ width: 375, border: "1px solid #ddd" }}
    />
  </figure>
</center>

### 4. 内容为自定义图标（组件）

```jsx | pure
<ButtonGroup
  options={[
    {
      label: <Icon name="star" />,
    },
    {
      label: <Icon name="star" color="blue" />,
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
  activeBgColor="pink"
  inactiveBgColor="white"
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
      alt="buttonGroup-ios4.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607592148736667477.png"
      style={{ width: 375, marginRight: 10, border: "1px solid #ddd" }}
    />
    <img
      alt="buttonGroup-android4.png"
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607592153333457480.png"
      style={{ width: 375, border: "1px solid #ddd" }}
    />
  </figure>
</center>

## API

| 属性 | 必填 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- | --- |
| options | `true` | 指定可选项 | `Option[]` |  |
| size | `false` | 尺寸 | `xxs` \| `xs` \| `s` \| `m` \| `l` \| `xl` \| `xxl` | `m` |
| disabledItems | `false` | 设置禁用的项 | `number[]` |  |
| activeIndex | `false` | 默认处于点击状态的 Item | number |  |
| itemStyle | `false` | 自定义 Item 样式 | `ViewStyle` |  |
| containerStyle | `false` | 自定义容器样式 | `ViewStyle` |  |
| activeBgColor | `false` | 选中时的按钮的背景颜色 | string |  |
| inactiveBgColor | `false` | 未选中时的按钮的背景颜色 | string |  |
| activeTextColor | `false` | 选中时的按钮的文本颜色 | string |  |
| inactiveTextColor | `false` | 未选中时的按钮的文本颜色 | string |  |

_`size`的值对应的具体大小定义在`theme`文件的`spacing`。_

### Option 类型

```jsx
interface Option {
  /** 文本或者组件 */
  label: ReactNode;
  /** 按下的回调函数 */
  onPress?: () => void;
  /** 自定义样式 */
  style?: StyleProp<ViewStyle>;
}
```
