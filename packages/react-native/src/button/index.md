---
title: Button - 按钮组件
nav:
  title: RN组件
  path: /react-native
group:
  title: Interaction
  path: /interaction
  order: 5
---

# Button 按钮组件

## 效果演示

### 1. 默认效果

```tsx | pure
<Button title="大按钮" onPress={() => console.log(2)} />
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
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609079170050361050.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609079122983224604.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 2. 禁用的圆角按钮

```tsx | pure
<Button title="圆按钮" shape="round" disabled onPress={() => console.log(4)} />
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
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609079298949324019.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609079319884710137.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 3. loading 中的小按钮

```tsx | pure
<Button title="小按钮" width={WIDTH.SMALL} loading onPress={() => Alert.alert('hi, button')} />
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
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609079499562647286.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609079433821237139.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 4. 线框样式按钮

```tsx | pure
<Button type="secondary" title="线框样式" onPress={() => Alert.alert('hi, button')} />
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
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609079593831040594.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609079635726738357.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 5. link 样式按钮和 text 样式按钮

```tsx | pure
<Button title="link 样式" width={WIDTH.SMALL} type="link" onPress={() => Alert.alert('hi, button')} />
<WhiteSpace />
<Button title="text 样式" type="text" onPress={() => Alert.alert('hi, button')} />
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
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609079796486558961.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609079754495549213.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 6. 背景渐变按钮

```tsx | pure
<Button
  title="背景渐变"
  type="primary"
  linearOptions={{ colors: [theme.colors.secondaryColor, theme.colors.primaryColor] }}
  onPress={() => Alert.alert('hi, button')}
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
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609079928833329817.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609079999502062816.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 7. 自定义渐变圆角禁用状态按钮

```tsx | pure
<Button
  title="自定义渐变"
  disabled
  width={'75%'}
  shape="round"
  onPress={() => Alert.alert('hi, button')}
  linearOptions={{
    start: { x: 1, y: 0 },
    end: { x: 0, y: 1 },
    colors: ['#F49E81', '#FFDD94'],
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
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609080134171283348.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609080092036777713.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## API

组件属性继承`TouchableHighlightProps`和`SpacingProps`，其余属性如下：

| 属性          | 必填    | 说明           | 类型                                         | 默认值    |
| ------------- | ------- | -------------- | -------------------------------------------- | --------- |
| title         | `true`  | 按钮文字内容   | `ReactNode`                                  |           |
| type          | `false` | 按钮展示类型   | `primary` \| `secondary` \| `link` \| `text` | `primary` |
| disabled      | `false` | 是否失效       | `boolean`                                    | `false`   |
| loading       | `false` | 是否加载中     | `boolean`                                    |           |
| onPress       | `true`  | 按钮点击事件   | `() => void`                                 |           |
| width         | `false` | 按钮宽度       | `number` \| `string`                         | `100%`    |
| shape         | `false` | 按钮形状       | ``                                           | `default` |
| ripple        | `false` | 是否启用水波纹 | `boolean`                                    | `false`   |
| linearOptions | `false` | 渐变自定义属性 | `LinearGradientProps`                        |           |

_`LinearGradientProps`来自 [react-native-linear-gradient](https://github.com/react-native-linear-gradient/react-native-linear-gradient) 组件_

```ts
export const WIDTH = {
  /** 大按钮 */
  LARGE: '100%',
  /** 中按钮 */
  MIDDLE: '50%',
  /** 小按钮 */
  SMALL: '25%',
};
```
