---
title: AutoComplete - 自动提示组件
nav:
  title: RN组件
  path: /react-native
group:
  title: Form
  path: /form
---

# AutoComplete 自动提示组件

输入框自动完成功能。

## 何时使用

- 需要一个输入框而不是选择器。
- 需要输入建议/辅助提示。

## 效果演示

### 1. 默认效果

```tsx | pure
const fetchData: () => Promise<{ key: number; title: string }[]> = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      const data = [
        { key: 1, title: '张三' },
        { key: 6, title: '张四' },
        { key: 2, title: '李四' },
        { key: 3, title: '王五' },
        { key: 4, title: '赵六' },
        { key: 5, title: '赵七' },
      ];
      resolve(data);
    }, 1500);
  });
};

const [value, setValue] = useState<string>();
const { data } = useRequest(fetchData);

<AutoComplete
  value={value}
  onChange={setValue}
  dropdownContainerStyle={{ borderTopWidth: ONE_PIXEL, borderTopColor: '#eee' }}
  options={data}
  onSelect={setValue}
/>;
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
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607915944363832073.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt=""
      src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607430991524&di=24c0bf75a6d0efeff1c48e13829eca72&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201308%2F23%2F220651x9b0h4kru904ozre.jpg"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 2. 靠底部效果

```tsx | pure
const fetchData: () => Promise<{ key: number; title: string }[]> = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      const data = [
        { key: 1, title: '张三' },
        { key: 6, title: '张四' },
        { key: 2, title: '李四' },
        { key: 3, title: '王五' },
        { key: 4, title: '赵六' },
        { key: 5, title: '赵七' },
      ];
      resolve(data);
    }, 1500);
  });
};

const [value, setValue] = useState<string>();
const { data } = useRequest(fetchData);

<AutoComplete
  value={value}
  onChange={setValue}
  dropdownContainerStyle={{ borderTopWidth: ONE_PIXEL, borderTopColor: '#eee' }}
  options={data}
  onSelect={setValue}
/>;
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
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1607918168189223503.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt=""
      src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607430991524&di=24c0bf75a6d0efeff1c48e13829eca72&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201308%2F23%2F220651x9b0h4kru904ozre.jpg"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## API

| 属性 | 必填 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- | --- |
| dropdownContainerStyle | `false` | 待选项容器样式 | `ViewStyle` |  |
| value | `false` | 值 | `string` | `''` |
| onChange | `false` | 值改变的回调 | `(value?: string) => void` |  |
| options | `true` | 待选项数组 | `Item[]` | `[]` |
| onSelect | `true` | 选中一个待选项 | `(value: string) => void` |  |
| onSubmitEditing | `false` | 点击软键盘确认键的回调 | `(e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void` |  |

_待选项高度由 options 的数量决定，dropdownContainerStyle 中的 height 无效_

```ts
export type Item = {
  key: number;
  title: string;
};
```
