---
title: Menu - 菜单组件
nav:
  title: RN组件
  path: /react-native
group:
  title: 交互组件
  path: /interaction
---

# Menu 菜单组件

## 效果演示

### 1. 默认效果

```tsx | pure
<Menu
  items={[
    {
      id: '1',
      title: 'Akveo React Native',
      items: [
        { id: '1-1', title: 'UI Kitten' },
        {
          id: '1-2',
          title: 'Kitten Tricks',
          items: [
            { id: '1-2-1', title: 'React Native Paper' },
            { id: '1-2-2', title: 'TD Design' },
          ],
        },
      ],
    },
    {
      id: '2',
      title: 'Akveo Angular',
      items: [
        { id: '2-1', title: 'Nebular' },
        { id: '2-2', title: 'ngx-admin' },
        { id: '2-3', title: 'UI Bakery' },
      ],
    },
    {
      id: '3',
      title: 'Akveo Design',
      items: [
        { id: '3-1', title: 'Eva Design System' },
        { id: '3-2', title: 'Eva Icons' },
      ],
    },
  ]}
/>
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

### 2. 允许展开多个菜单组

```tsx | pure
<Menu
  multiple
  items={[
    {
      id: '1',
      title: 'Akveo React Native',
      items: [
        { id: '1-1', title: 'UI Kitten' },
        {
          id: '1-2',
          title: 'Kitten Tricks',
          items: [
            { id: '1-2-1', title: 'React Native Paper' },
            { id: '1-2-2', title: 'TD Design' },
          ],
        },
      ],
    },
    {
      id: '2',
      title: 'Akveo Angular',
      items: [
        { id: '2-1', title: 'Nebular' },
        { id: '2-2', title: 'ngx-admin' },
        { id: '2-3', title: 'UI Bakery' },
      ],
    },
    {
      id: '3',
      title: 'Akveo Design',
      items: [
        { id: '3-1', title: 'Eva Design System' },
        { id: '3-2', title: 'Eva Icons' },
      ],
    },
  ]}
/>
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
<Menu
  defaultSelectedKey="1-2-1"
  items={[
    {
      id: '1',
      title: 'Akveo React Native',
      items: [
        { id: '1-1', title: 'UI Kitten' },
        {
          id: '1-2',
          title: 'Kitten Tricks',
          items: [
            { id: '1-2-1', title: 'React Native Paper' },
            { id: '1-2-2', title: 'TD Design' },
          ],
        },
      ],
    },
    {
      id: '2',
      title: 'Akveo Angular',
      items: [
        { id: '2-1', title: 'Nebular' },
        { id: '2-2', title: 'ngx-admin' },
        { id: '2-3', title: 'UI Bakery' },
      ],
    },
    {
      id: '3',
      title: 'Akveo Design',
      items: [
        { id: '3-1', title: 'Eva Design System' },
        { id: '3-2', title: 'Eva Icons' },
      ],
    },
  ]}
/>
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
<Menu
  items={[
    {
      id: '1',
      title: 'Akveo React Native',
      left: <IconHome />,
      items: [
        { id: '1-1', title: 'UI Kitten' },
        {
          id: '1-2',
          title: 'Kitten Tricks',
          items: [
            { id: '1-2-1', title: 'React Native Paper' },
            { id: '1-2-2', title: 'TD Design' },
          ],
        },
      ],
    },
    {
      id: '2',
      title: 'Akveo Angular',
      left: <IconNotification />,
      items: [
        { id: '2-1', title: 'Nebular' },
        { id: '2-2', title: 'ngx-admin' },
        { id: '2-3', title: 'UI Bakery' },
      ],
    },
    {
      id: '3',
      title: 'Akveo Design',
      left: <IconCreate />,
      items: [
        { id: '3-1', title: 'Eva Design System' },
        { id: '3-2', title: 'Eva Icons' },
      ],
    },
  ]}
/>
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
<Menu
  items={[
    {
      id: '1',
      title: 'Akveo React Native',
      customIcon: <IconHome />,
    },
    {
      id: '2',
      title: 'Akveo Angular',
      customIcon: <IconNotification />,
    },
    {
      id: '3',
      title: 'Akveo Design',
      customIcon: <IconCreate />,
    },
  ]}
/>
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

## API

### Menu

| 属性               | 必填    | 说明                       | 类型                    | 默认值        |
| ------------------ | ------- | -------------------------- | ----------------------- | ------------- |
| items              | `true`  | 菜单数据                   | `MenuItemProps[]`       |               |
| multiple           | `false` | 是否允许展开多个菜单组     | `boolean`               | `false`       |
| width              | `false` | 宽度                       | `number`                | `deviceWidth` |
| selectedKey        | `false` | 选中的菜单                 | `string`                |               |
| defaultSelectedKey | `false` | 默认选中的菜单             | `string`                |               |
| onSelect           | `false` | 选中 MenuItem 时触发的事件 | `(key: string) => void` |               |
| activeColor        | `false` | MenuItem 选中时背景色      | `string`                |               |
| activeTextColor    | `false` | MenuItem 选中时文字颜色    | `string`                |               |
| style              | `false` | 自定义样式                 | `ViewStyle`             |               |
| itemStyle          | `false` | 菜单项样式                 | `ViewStyle`             |               |
| activeOpacity      | `false` | 菜单项点击时的不透明度     | `number`                | `0.6`         |

### MenuItemProps

| 属性       | 必填    | 说明           | 类型              | 默认值  |
| ---------- | ------- | -------------- | ----------------- | ------- |
| id         | `true`  | 唯一标识       | `string`          |         |
| title      | `true`  | 标题           | `string`          |         |
| left       | `false` | 自定义左侧内容 | `ReactNode`       |         |
| customIcon | `false` | 自定义图标     | `ReactNode`       |         |
| disabled   | `false` | 是否禁用菜单项 | `boolean`         | `false` |
| items      | `false` | 下级菜单       | `MenuItemProps[]` |         |
