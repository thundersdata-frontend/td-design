---
title: Progress - 进度条组件
nav:
  title: RN组件
  path: /react-native
group:
  title: 反馈组件
  path: /feedback
---

# Progress 进度条

## 效果演示

### 1. LineProgress 默认效果

```tsx | pure
<LineProgress value={70} />
```

<center>
  <figure>
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609055940832313088.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 2. LineProgress 值文本在顶部效果

```tsx | pure
<LineProgress value={100} labelPosition="top" />
```

<center>
  <figure>
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609055836045311052.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 3. LineProgress 渐变色效果

```tsx | pure
<LineProgress value={87} color={['#FFD080', 'red']} showLabel labelPosition="top" />
```

<center>
  <figure>
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609055728101996419.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 4. LineProgress 修改宽度效果

```tsx | pure
<LineProgress value={87} strokeWidth={16} />
```

<center>
  <figure>
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609055614844577639.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 5. CircleProgress 默认效果

```tsx | pure
<CircleProgress value={80} />
```

<center>
  <figure>
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609056150372671370.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 6. CircleProgress 不显示值文本效果

```tsx | pure
<CircleProgress value={40} showLabel={false} />
```

<center>
  <figure>
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609056236868086678.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 7. CircleProgress 自定义颜色效果

```tsx | pure
<CircleProgress value={50} color="red" bgColor="green" />
```

<center>
  <figure>
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609056494084934403.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 8. CircleProgress 渐变色效果

```tsx | pure
<CircleProgress value={70} strokeWidth={16} />
```

<center>
  <figure>
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609056864300543651.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 9. CircleProgress 修改宽度效果

```tsx | pure
<CircleProgress value={70} strokeWidth={16} />
```

<center>
  <figure>
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609056613317325817.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## API

```tsx | pure
export interface ProgressProps {
  /** 长度 */
  width?: number;
  /** 颜色, 支持渐变 */
  color?: string | string[];
  /** 背景色 */
  bgColor?: string;
  /** 宽度 */
  strokeWidth?: number;
  /** 值 */
  value?: number;
  /** 值文本位置 */
  labelPosition?: 'right' | 'top';
  /** 是否显示单位 */
  unit?: string;
  /** 自定义文本 */
  label?: ReactNode;
  /** 是否显示文本 */
  showLabel?: boolean;
  /** 文本样式 */
  labelStyle?: StyleProp<ViewStyle>;
}
```
