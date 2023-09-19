---
title: Tree - 树形展示
nav:
  title: RN组件
  path: /react-native
group:
  title: 展示组件
  path: /display
---

# Tree 树形展示

## 效果演示

### 1. 默认效果

```tsx | pure
const treeData = [
  {
    text: 'parent 1',
    id: '0-0',
    items: [
      {
        text: 'parent 1-0',
        id: '0-0-0',
        items: [
          {
            text: 'leaf1',
            id: '0-0-0-0',
          },
          {
            text: 'leaf2',
            id: '0-0-0-1',
          },
        ],
      },
      {
        text: 'parent 1-1',
        id: '0-0-1',
        items: [{ text: 'sss', id: '0-0-1-0' }],
      },
    ],
  },
];

<Tree treeData={treeData} />;
```

<center>
  <figure>
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1691117292364540973.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 2. 默认展开全部

```tsx | pure
const treeData = [
  {
    text: 'parent 1',
    id: '0-0',
    items: [
      {
        text: 'parent 1-0',
        id: '0-0-0',
        items: [
          {
            text: 'leaf1',
            id: '0-0-0-0',
          },
          {
            text: 'leaf2',
            id: '0-0-0-1',
          },
        ],
      },
      {
        text: 'parent 1-1',
        id: '0-0-1',
        items: [{ text: 'sss', id: '0-0-1-0' }],
      },
    ],
  },
];

<Tree treeData={treeData} expandAll />;
```

<center>
  <figure>
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1691117349496037901.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 3. 不允许选择

```tsx | pure
const treeData = [
  {
    text: 'parent 1',
    id: '0-0',
    items: [
      {
        text: 'parent 1-0',
        id: '0-0-0',
        items: [
          {
            text: 'leaf1',
            id: '0-0-0-0',
          },
          {
            text: 'leaf2',
            id: '0-0-0-1',
          },
        ],
      },
      {
        text: 'parent 1-1',
        id: '0-0-1',
        items: [{ text: 'sss', id: '0-0-1-0' }],
      },
    ],
  },
];

<Tree treeData={treeData} checkable={false} />;
```

<center>
  <figure>
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1691117352200938761.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 4. 默认展开某些节点

```tsx | pure
const treeData = [
  {
    text: 'parent 1',
    id: '0-0',
    items: [
      {
        text: 'parent 1-0',
        id: '0-0-0',
        items: [
          {
            text: 'leaf1',
            id: '0-0-0-0',
          },
          {
            text: 'leaf2',
            id: '0-0-0-1',
          },
        ],
      },
      {
        text: 'parent 1-1',
        id: '0-0-1',
        items: [{ text: 'sss', id: '0-0-1-0' }],
      },
    ],
  },
];

<Tree treeData={treeData} defaultExpandedKeys={['0-0-0']} />;
```

<center>
  <figure>
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1691117354815634217.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 5. 默认勾选一些节点

```tsx | pure
const treeData = [
  {
    text: 'parent 1',
    id: '0-0',
    items: [
      {
        text: 'parent 1-0',
        id: '0-0-0',
        items: [
          {
            text: 'leaf1',
            id: '0-0-0-0',
          },
          {
            text: 'leaf2',
            id: '0-0-0-1',
          },
        ],
      },
      {
        text: 'parent 1-1',
        id: '0-0-1',
        items: [{ text: 'sss', id: '0-0-1-0' }],
      },
    ],
  },
];

<Tree treeData={treeData} defaultCheckedKeys={['0-0-0-1']} />;
```

<center>
  <figure>
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1691117357704530374.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 6. 禁用某些节点

```tsx | pure
const treeData = [
  {
    text: 'parent 1',
    id: '0-0',
    items: [
      {
        text: 'parent 1-0',
        id: '0-0-0',
        items: [
          {
            text: 'leaf1',
            id: '0-0-0-0',
            disabled: true,
          },
          {
            text: 'leaf2',
            id: '0-0-0-1',
          },
        ],
      },
      {
        text: 'parent 1-1',
        id: '0-0-1',
        disabled: true,
        items: [{ text: 'sss', id: '0-0-1-0' }],
      },
    ],
  },
];

<Tree treeData={treeData} expandAll />;
```

<center>
  <figure>
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1691117360435326271.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 7. 自定义展开图标

```tsx | pure
const CustomExpandIcon: FC<{ progress: Animated.SharedValue<number> }> = ({ progress }) => {
  const theme = useTheme<Theme>();
  const style = useAnimatedStyle(() => ({
    transform: [{ rotateZ: `${mix(progress.value, 0, Math.PI / 2)}rad` }],
  }));

  return (
    <Animated.View style={style}>
      <SvgIcon name="bells" color={theme.colors.gray500} />
    </Animated.View>
  );
};

const treeData = [
  {
    text: 'parent 1',
    id: '0-0',
    items: [
      {
        text: 'parent 1-0',
        id: '0-0-0',
        items: [
          {
            text: 'leaf1',
            id: '0-0-0-0',
          },
          {
            text: 'leaf2',
            id: '0-0-0-1',
          },
        ],
      },
      {
        text: 'parent 1-1',
        id: '0-0-1',
        items: [{ text: 'sss', id: '0-0-1-0' }],
      },
    ],
  },
];

<Tree treeData={treeData} customExpandIcon={progress => <CustomExpandIcon {...{ progress }} />} />;
```

<center>
  <figure>
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1691117363395426531.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 8. 自定义节点样式

```tsx | pure
const treeData = [
  {
    text: 'parent 1',
    id: '0-0',
    items: [
      {
        text: 'parent 1-0',
        id: '0-0-0',
        items: [
          {
            text: 'leaf1',
            id: '0-0-0-0',
            style: { backgroundColor: 'red' },
            textStyle: { color: 'white' },
          },
          {
            text: 'leaf2',
            id: '0-0-0-1',
          },
        ],
      },
      {
        text: 'parent 1-1',
        id: '0-0-1',
        items: [{ text: 'sss', id: '0-0-1-0' }],
      },
    ],
  },
];

<Tree treeData={treeData} nodeStyle={{ backgroundColor: 'blue' }} />;
```

<center>
  <figure>
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1691117366402405161.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## API

### TreeProps

| 属性 | 必填 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- | --- |
| data | `true` | 树的节点数据 | `TreeItemProps[]` |  |
| checkable | `false` | 是否可以选择的 | `boolean` | `true` |
| checkedKeys | `false` | 选中的节点(受控的) | `string[]` |  |
| defaultCheckedKeys | `false` | 默认选中的 key 第一次加载有效 | `string[]` |  |
| expandAll | `false` | 全部展开 | `boolean` | `false` |
| defaultExpandedKeys | `false` | 默认展开的节点 | `string[]` |  |
| expandedKeys | `false` | 展开的节点 | `string[]` |  |
| onCheck | `false` | 选中事件回调 | `(keys: string[]) => void` |  |
| onExpand | `false` | 展开事件回调 | `(keys: string[]) => void` |  |
| customExpandIcon | `false` | 自定义展开图标 | `(progress: Animated.SharedValue<number>) => ReactElement` |  |
| activeOpacity | `false` | 树节点点击时的不透明度 | `number` | `0.6` |
| style | `false` | 树样式 | `StyleProp<ViewStyle>` |  |
| nodeStyle | `false` | 树节点样式 | `StyleProp<ViewStyle>` |  |

### TreeItemProps

| 属性            | 必填     | 说明             | 类型                                                   | 默认值  |
| --------------- | -------- | ---------------- | ------------------------------------------------------ | ------- |
| id              | `true`   | 节点唯一标识     | `number`                                               |         |
| text            | `true`   | 节点文字         | `string`                                               |         |
| items           | `false`  | 子节点           | `TreeItemProps[]`                                      |         |
| disabled        | `false ` | 是否禁用         | `number`                                               | `false` |
| onPress         | `false ` | 点击树节点的回调 | `(id: string) => void`                                 |         |
| customCheckIcon | `false ` | 自定义选中图标   | `(checked: 'all' \| 'half' \| 'none') => ReactElement` |         |
| style           | `false ` | 节点样式         | `StyleProp<ViewStyle>`                                 |         |
| textStyle       | `false ` | 节点文字样式     | `StyleProp<TextStyle>`                                 |         |
