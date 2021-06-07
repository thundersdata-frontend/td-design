---
title: ImagePicker - 图片选择组件
nav:
  title: RN组件
  path: /react-native
group:
  title: Form
  path: /form
---

# ImagePicker 图片选择组件

使用本组件需要单独安装：**yarn add @td-design/react-native-image-picker react-native-image-picker**

该组件依赖[react-native-image-picker](https://github.com/react-native-image-picker/react-native-image-picker)

## 效果演示

### 1. 默认效果

```tsx | pure
<ImagePicker
  upload={file => {
    setImgSource2(file.url);
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
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609935874491458670.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609935739069747618.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 2. 自定义上传文字和图标

```tsx | pure
<ImagePicker
  borderType="dashed"
  upload={file => {
    setImgSource1(file.url);
  }}
  title="上传"
  icon={<Icon rounded name="camerao" color={theme.colors.primaryColor} size={34} />}
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
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609935165261510661.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1609935549548314483.gif"
      style="width: 375px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## API

| 属性             | 必填    | 说明                       | 类型                                          | 默认值     |
| ---------------- | ------- | -------------------------- | --------------------------------------------- | ---------- |
| width            | `false` | 上传按钮宽度               | `number`                                      | `100`      |
| height           | `false` | 上传按钮高度               | `number`                                      | `100`      |
| borderType       | `false` | 上传边框类型               | `dashed` \| `solid`                           | `solid`    |
| borderColor      | `false` | 上传边框颜色               | `string`                                      |            |
| icon             | `false` | 自定义图标                 | `ReactNode`                                   |            |
| initialImgSource | `false` | 初始化背景图               | `ImageSourcePropType`                         |            |
| options          | `false` | 其他图片自定义配置         | `CameraOptions`                               |            |
| title            | `false` | 悬浮提示文字               | `ReactNode`                                   | `上传图片` |
| showUploadImg    | `false` | 上传图片后是否在背景图展示 | `boolean`                                     | `true`     |
| beforeUpload     | `false` | 上传文件之前的钩子         | `(file: File) => boolean \| Promise<boolean>` |            |
| upload           | `false` | 上传方法                   | `(file: File) => void`                        |            |
| onCancel         | `false` | 取消上传事件回调           | `(response: ImagePickerResponse) => void`     |            |
| onFail           | `false` | 上传失败事件回调           | `(response: ImagePickerResponse) => void`     |            |

## 主题相关属性

| 属性 | 说明 | 普通模式 | 暗黑模式 |
| ---- | ---- | -------- | -------- |

_palette 和 darkPalette 的定义详见[内置主题](/react-native/theme)_

_`CameraOptions`来自 [react-native-image-picker](https://github.com/react-native-image-picker/react-native-image-picker)_

```ts
export interface File {
  fileName: string;
  fileType: string;
  uri: string;
}
```
