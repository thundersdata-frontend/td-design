---
title: Menu - 菜单组件
nav:
  title: RN组件
  path: /react-native
group:
  title: Interaction
  path: /interaction
  order: 8
---

# Menu 菜单组件

## 效果演示

### 1. MenuItem

```tsx | pure
<Menu>
  <MenuItem title="UI Kitten" />
  <MenuItem title="Kitten Tricks" />
  <MenuItem title="Nebular" />
</Menu>
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
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1610086585323919418.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1610086590605879094.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 2. MenuGroup

```tsx | pure
<Menu>
  <MenuGroup id="1" title="Akveo React Native">
    <MenuItem id="1-1" title="UI Kitten" />
    <MenuItem id="1-2" title="Kitten Tricks" />
  </MenuGroup>
  <MenuGroup id="2" title="Akveo Angular">
    <MenuItem id="2-1" title="Nebular" />
    <MenuItem id="2-2" title="ngx-admin" />
    <MenuItem id="2-3" title="UI Bakery" />
  </MenuGroup>
  <MenuGroup id="3" title="Akveo Design">
    <MenuItem id="3-1" title="Eva Design System" />
    <MenuItem id="3-2" title="Eva Icons" />
  </MenuGroup>
</Menu>
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
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1610089309381058267.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1610089321272569955.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 3. 默认选中

```tsx | pure
const [selectedIndex, setSelectedIndex] = useState<IndexPath>({ row: '3-2', section: '3' });

<Menu selectedIndex={selectedIndex} onSelect={setSelectedIndex}>
  <MenuGroup id="1" title="Akveo React Native">
    <MenuItem id="1-1" title="UI Kitten" />
    <MenuItem id="1-2" title="Kitten Tricks" />
  </MenuGroup>
  <MenuGroup id="2" title="Akveo Angular">
    <MenuItem id="2-1" title="Nebular" />
    <MenuItem id="2-2" title="ngx-admin" />
    <MenuItem id="2-3" title="UI Bakery" />
  </MenuGroup>
  <MenuGroup id="3" title="Akveo Design">
    <MenuItem id="3-1" title="Eva Design System" />
    <MenuItem id="3-2" title="Eva Icons" />
  </MenuGroup>
</Menu>;
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
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1610089550673451211.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1610089535807792236.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 4. 标题左侧图标

```tsx | pure
<Menu>
  <MenuGroup id="1" title="Akveo React Native" left={{ name: 'user', color: 'gold' }}>
    <MenuItem id="1-1" title="UI Kitten" />
    <MenuItem id="1-2" title="Kitten Tricks" />
  </MenuGroup>
  <MenuGroup id="2" title="Akveo Angular" left={{ name: 'star', color: 'gold' }}>
    <MenuItem id="2-1" title="Nebular" />
    <MenuItem id="2-2" title="ngx-admin" />
    <MenuItem id="2-3" title="UI Bakery" />
  </MenuGroup>
  <MenuGroup id="3" title="Akveo Design" left={{ name: 'lock', color: 'gold' }}>
    <MenuItem id="3-1" title="Eva Design System" />
    <MenuItem id="3-2" title="Eva Icons" />
  </MenuGroup>
</Menu>
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
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1610089722422172473.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1610089738359430642.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 5. MenuItem 右侧图标

```tsx | pure
<Menu>
  <MenuGroup id="1" title="Akveo React Native" left={{ name: 'user', color: 'gold' }}>
    <MenuItem id="1-1" title="UI Kitten" right={{ name: 'right', color: 'black', activeColor: 'white' }} />
    <MenuItem id="1-2" title="Kitten Tricks" right={{ name: 'right', color: 'black', activeColor: 'white' }} />
  </MenuGroup>
  <MenuGroup id="2" title="Akveo Angular" left={{ name: 'star', color: 'gold' }}>
    <MenuItem id="2-1" title="Nebular" right={{ name: 'right', color: 'black', activeColor: 'white' }} />
    <MenuItem id="2-2" title="ngx-admin" right={{ name: 'right', color: 'black', activeColor: 'white' }} />
    <MenuItem id="2-3" title="UI Bakery" right={{ name: 'right', color: 'black', activeColor: 'white' }} />
  </MenuGroup>
  <MenuGroup id="3" title="Akveo Design" left={{ name: 'lock', color: 'gold' }}>
    <MenuItem id="3-1" title="Eva Design System" right={{ name: 'right', color: 'black', activeColor: 'white' }} />
    <MenuItem id="3-2" title="Eva Icons" right={{ name: 'right', color: 'black', activeColor: 'white' }} />
  </MenuGroup>
</Menu>
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
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1610089971720910854.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1610089959051589575.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 6. 设置宽度和行高

```tsx | pure
<Menu width={300} itemHeight={60}>
  <MenuGroup id="1" title="Akveo React Native" left={{ name: 'user', color: 'gold' }}>
    <MenuItem id="1-1" title="UI Kitten" right={{ name: 'right', color: 'black', activeColor: 'white' }} />
    <MenuItem id="1-2" title="Kitten Tricks" right={{ name: 'right', color: 'black', activeColor: 'white' }} />
  </MenuGroup>
  <MenuGroup id="2" title="Akveo Angular" left={{ name: 'star', color: 'gold' }}>
    <MenuItem id="2-1" title="Nebular" right={{ name: 'right', color: 'black', activeColor: 'white' }} />
    <MenuItem id="2-2" title="ngx-admin" right={{ name: 'right', color: 'black', activeColor: 'white' }} />
    <MenuItem id="2-3" title="UI Bakery" right={{ name: 'right', color: 'black', activeColor: 'white' }} />
  </MenuGroup>
  <MenuGroup id="3" title="Akveo Design" left={{ name: 'lock', color: 'gold' }}>
    <MenuItem id="3-1" title="Eva Design System" right={{ name: 'right', color: 'black', activeColor: 'white' }} />
    <MenuItem id="3-2" title="Eva Icons" right={{ name: 'right', color: 'black', activeColor: 'white' }} />
  </MenuGroup>
</Menu>
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
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1610090165480190000.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1610090150500639170.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## API

### Menu

| 属性              | 必填    | 说明                       | 类型                        | 默认值        |
| ----------------- | ------- | -------------------------- | --------------------------- | ------------- |
| selectedIndex     | `false` | 当前选中的 MenuItem        | `IndexPath`                 |               |
| onSelect          | `false` | 选中 MenuItem 时触发的事件 | `(item: IndexPath) => void` |               |
| width             | `false` | 宽度                       | `number`                    | `deviceWidth` |
| itemHeight        | `false` | MenuItem 的行高            | `number`                    | `40`          |
| activeBgColor     | `false` | MenuItem 选中时背景色      | `string`                    |               |
| activeTextColor   | `false` | MenuItem 选中时文字颜色    | `string`                    |               |
| inactiveBgColor   | `false` | MenuItem 未选中时背景色    | `string`                    |               |
| inactiveTextColor | `false` | MenuItem 未选中时文字颜色  | `string`                    |               |
| style             | `false` | 自定义样式                 | `ViewStyle`                 |               |

### MenuGroup

| 属性          | 必填    | 说明                            | 类型                                   | 默认值  |
| ------------- | ------- | ------------------------------- | -------------------------------------- | ------- |
| id            | `true`  | 唯一标识                        | `string`                               |         |
| title         | `true`  | 标题                            | `string`                               |         |
| left          | `false` | 左侧自定义内容，如图标          | `IconProps & { activeColor?: string }` |         |
| disabled      | `false` | 是否禁用 group                  | `boolean`                              | `false` |
| width         | `false` | 宽度                            | `number`                               |         |
| height        | `false` | 高度                            | `number`                               |         |
| onSelect      | `false` | 透传点击时触发的事件到 MenuItem | `(selectedIndex: IndexPath) => void`   |         |
| selectedIndex | `false` | 当前选中的 MenuItem 的 id       | `string`                               |         |
| section       | `false` | 当前展开的 MenuGroup 的 id      | `boolean`                              | `false` |
| style         | `false` | 自定义样式                      | `ViewStyle`                            |         |

### MenuItem

| 属性          | 必填    | 说明                            | 类型                                   | 默认值  |
| ------------- | ------- | ------------------------------- | -------------------------------------- | ------- |
| id            | `true`  | 唯一标识                        | `string`                               |         |
| title         | `true`  | 标题                            | `string`                               |         |
| left          | `false` | 左侧自定义内容，如图标          | `IconProps`                            |         |
| right         | `false` | 右侧自定义内容，如图标          | `IconProps & { activeColor?: string }` |         |
| disabled      | `false` | 是否禁用 MenuItem               | `boolean`                              | `false` |
| width         | `false` | 宽度                            | `number`                               |         |
| height        | `false` | 高度                            | `number`                               |         |
| onSelect      | `false` | 透传点击时触发的事件到 MenuItem | `(selectedIndex: IndexPath) => void`   |         |
| onPress       | `false` | 点击一个 MenuItem 时触发的事件  | `() => void`                           |         |
| inGroup       | `false` | 是否是在 MenuGroup 下           | `boolean`                              | `false` |
| selectedIndex | `false` | 当前选中的 MenuItem 的 id       | `boolean`                              | `false` |
| section       | `false` | 所在的 MenuGroup 的 id          | `string`                               |         |
| style         | `false` | 自定义样式                      | `ViewStyle`                            |         |

```ts
interface IndexPath {
  /** MenuItem 的 id */
  row?: string;
  /** MenuGroup 的 id */
  section?: string;
}
```
