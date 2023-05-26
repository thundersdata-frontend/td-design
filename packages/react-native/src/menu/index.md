---
title: Menu - 菜单组件
nav:
  title: RN组件
  path: /react-native
group:
  title: Interaction
  path: /interaction
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
  <figure>
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643182636025692280.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 2. MenuGroup

```tsx | pure
<Menu {...{ selectedIndex }}>
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
  <MenuItem id="4-1" title="Eva Design System" />
  <MenuItem id="4-2" title="Eva Icons" />
</Menu>
```

<center>
  <figure>
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643182742563505265.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
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
  <figure>
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643182794298569975.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 4. 标题左侧图标

```tsx | pure
<Menu>
  <MenuGroup id="1" title="Akveo React Native" left={<IconCreate />}>
    <MenuItem id="1-1" title="UI Kitten" />
    <MenuItem id="1-2" title="Kitten Tricks" />
  </MenuGroup>
  <MenuGroup id="2" title="Akveo Angular" left={<IconNotification />}>
    <MenuItem id="2-1" title="Nebular" />
    <MenuItem id="2-2" title="ngx-admin" />
    <MenuItem id="2-3" title="UI Bakery" />
  </MenuGroup>
  <MenuGroup id="3" title="Akveo Design" left={<IconHome />}>
    <MenuItem id="3-1" title="Eva Design System" />
    <MenuItem id="3-2" title="Eva Icons" />
  </MenuGroup>
</Menu>
```

<center>
  <figure>
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643182918993710418.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 5. MenuItem 右侧图标

```tsx | pure
<Menu>
  <MenuGroup id="1" title="Akveo React Native">
    <MenuItem id="1-1" title="UI Kitten" right={<IconCreate />} />
    <MenuItem id="1-2" title="Kitten Tricks" />
  </MenuGroup>
  <MenuGroup id="2" title="Akveo Angular">
    <MenuItem id="2-1" title="Nebular" right={<IconNotification />} />
    <MenuItem id="2-2" title="ngx-admin" />
    <MenuItem id="2-3" title="UI Bakery" />
  </MenuGroup>
  <MenuGroup id="3" title="Akveo Design">
    <MenuItem id="3-1" title="Eva Design System" right={<IconHome />} />
    <MenuItem id="3-2" title="Eva Icons" />
  </MenuGroup>
</Menu>
```

<center>
  <figure>
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643182990373408617.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 6. 设置宽度和行高

```tsx | pure
<Menu width={300} itemHeight={60}>
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
  <figure>
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1643183036261732843.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
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

| 属性          | 必填    | 说明                            | 类型                                 | 默认值  |
| ------------- | ------- | ------------------------------- | ------------------------------------ | ------- |
| id            | `true`  | 唯一标识                        | `string`                             |         |
| title         | `true`  | 标题                            | `string`                             |         |
| left          | `false` | 左侧自定义内容，如图标          | `ReactNode`                          |         |
| disabled      | `false` | 是否禁用 group                  | `boolean`                            | `false` |
| width         | `false` | 宽度                            | `number`                             |         |
| height        | `false` | 高度                            | `number`                             |         |
| onSelect      | `false` | 透传点击时触发的事件到 MenuItem | `(selectedIndex: IndexPath) => void` |         |
| selectedIndex | `false` | 当前选中的 MenuItem 的 id       | `string`                             |         |
| section       | `false` | 当前展开的 MenuGroup 的 id      | `boolean`                            | `false` |
| style         | `false` | 自定义样式                      | `ViewStyle`                          |         |
| activeOpacity | `false` | 按下时的不透明度                | `number`                             | `0.5`   |

### MenuItem

| 属性          | 必填    | 说明                            | 类型                                 | 默认值  |
| ------------- | ------- | ------------------------------- | ------------------------------------ | ------- |
| id            | `true`  | 唯一标识                        | `string`                             |         |
| title         | `true`  | 标题                            | `string`                             |         |
| left          | `false` | 左侧自定义内容，如图标          | `ReactNode`                          |         |
| right         | `false` | 右侧自定义内容，如图标          | `ReactNode`                          |         |
| disabled      | `false` | 是否禁用 MenuItem               | `boolean`                            | `false` |
| width         | `false` | 宽度                            | `number`                             |         |
| height        | `false` | 高度                            | `number`                             |         |
| onSelect      | `false` | 透传点击时触发的事件到 MenuItem | `(selectedIndex: IndexPath) => void` |         |
| onPress       | `false` | 点击一个 MenuItem 时触发的事件  | `() => void`                         |         |
| inGroup       | `false` | 是否是在 MenuGroup 下           | `boolean`                            | `false` |
| selectedIndex | `false` | 当前选中的 MenuItem 的 id       | `boolean`                            | `false` |
| section       | `false` | 所在的 MenuGroup 的 id          | `string`                             |         |
| style         | `false` | 自定义样式                      | `ViewStyle`                          |         |
| activeOpacity | `false` | 按下时的不透明度                | `number`                             | `0.5`   |

```ts
interface IndexPath {
  /** MenuItem 的 id */
  row?: string;
  /** MenuGroup 的 id */
  section?: string;
}
```
