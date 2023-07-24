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

### 1. 树视图受控

```tsx | pure
<Tree
  treeData={treeData}
  checkedKeys={checked}
  onCheck={e => {
    console.log(e);
    setChecked(e);
  }}
/>
```

<center>
  <figure>
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1644809702151430047.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 2. 默认展开全部

```tsx | pure
<Tree
  treeData={treeData}
  defaultExpandAll
  onCheck={e => {
    console.log(e);
  }}
/>
```

<center>
  <figure>
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1644809826635078171.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 3.默认选中

```tsx | pure
<Tree
  treeData={treeData}
  defaultCheckedKeys={['0-0', '3-2-1']}
  onCheck={e => {
    console.log(e);
  }}
/>
```

<center>
  <figure>
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1644809930211023700.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 4.禁用

```tsx | pure
<Tree treeData={treeData} disabled />
```

<center>
  <figure>
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1644810023065044099.png"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 5.严格选中

```tsx | pure
<Tree treeData={treeData} checkStrictly />
```

<center>
  <figure>
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1644810114904027973.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 6.默认展开节点

```tsx | pure
<Tree treeData={treeData} defaultExpandedKeys={['0-0', '3-2-1']} />
```

<center>
  <figure>
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1644810215528809116.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 7.隐藏尾部的图标

```tsx | pure
<Tree treeData={treeData} showIcon={false} />
```

<center>
  <figure>
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1644810305989495158.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 8.自定义 icon

```tsx | pure
<Tree
  treeData={treeData}
  icon={action => {
    return action ? <Text>选中</Text> : <Text>未选中</Text>;
  }}
/>
```

<center>
  <figure>
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1644810389439922952.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 9.树弹窗

```tsx | pure
<Button
  title="modal"
  onPress={() =>
    modal({
      treeData: treeData,
      height: 300,
      defaultExpandAll: true,
    })
  }
/>
```

<center>
  <figure>
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1644810651867205056.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## API

| 属性                | 必填    | 说明                          | 类型                                | 默认值  |
| ------------------- | ------- | ----------------------------- | ----------------------------------- | ------- |
| height              | `false` | 组件的高度                    | `number`                            |         |
| treeData            | `false` | 树的节点数据                  | `TreeItemProps[]`                   |         |
| disabled            | `false` | 禁用                          | `boolean`                           | `false` |
| checkable           | `false` | 是否可以选择的                | `boolean`                           | `true`  |
| checkStrictly       | `false` | 是否严格选中                  | `boolean`                           | `false` |
| checkedKeys         | `false` | 选中的节点(受控的)            | `string[]`                          |         |
| defaultCheckedKeys  | `false` | 默认选中的 key 第一次加载有效 | `string[]`                          |         |
| defaultExpandAll    | `false` | 默认全部展开                  | `boolean`                           | `false` |
| defaultExpandedKeys | `false` | 默认展开的节点                | `string[]`                          |         |
| expandedKeys        | `false` | 展开的节点                    | `string[]`                          |         |
| showIcon            | `false` | 是否显示尾部的图标            | `boolean`                           | `true`  |
| onCheck             | `false` | 选中事件回调                  | `(keys: string[]) => void`          |         |
| onExpand            | `false` | 展开事件回调                  | `(treeNode: EventDataNode) => void` |         |
| icon                | `false` | 自定义 icon                   | `(checked: boolean) => ReactNode`   |         |

```ts
interface TreeItemProps {
  key: string;
  title: string;
  children?: Array<TreeItemProps | ReactNode>;
  disabled?: boolean;
  icon?: (checked: boolean) => ReactNode;
}
```
