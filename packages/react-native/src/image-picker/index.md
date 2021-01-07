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

## 效果演示

### 1. 默认效果

```tsx | pure
<ImagePicker
  action={UPLOAD_URL}
  data={{ access_token: ACCESS_TOKEN }}
  borderStyle="solid"
  onSuccess={file => {
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
  action={UPLOAD_URL}
  data={{ access_token: ACCESS_TOKEN }}
  borderStyle="dashed"
  onSuccess={file => {
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

属性继承了`restyle`的`SpacingProps`。

| 属性 | 必填 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- | --- |
| action | `true` | 上传的地址 | `string` |  |
| data | `false` | 上传的额外参数 | `StoreProps` |  |
| headers | `false` | 设置上传头部 | `StoreProps` |  |
| borderStyle | `false` | 上传边框样式类型 | `dashed` \| `solid` |  |
| icon | `false` | 自定义图标 | `ReactNode` |  |
| initialImgSource | `false` | 初始化背景图 | `ImageSourcePropType` |  |
| options | `false` | 其他图片自定义配置 | `CameraOptions` |  |
| title | `false` | 悬浮提示文字 | `ReactNode` |  |
| showUploadImg | `false` | 上传图片后是否在背景图展示 | `boolean` |  |
| beforeUpload | `false` | 上传文件之前的钩子 | `(file: File) => boolean \| Promise<boolean>` |  |
| customRequest | `false` | 自定义上传 | `(file: File) => Promise<{ success: boolean; file: string }>` |  |
| onCancel | `false` | 取消上传事件回调 | `(response: ImagePickerResponse) => void` |  |
| onFail | `false` | 上传失败事件回调 | `(response: ImagePickerResponse) => void` |  |
| onSuccess | `false` | 上传成功事件回调 | `(file: UploadResponse) => void` |  |

_`ImagePickerResponse`和`CameraOptions`来自 [react-native-image-picker](https://github.com/react-native-image-picker/react-native-image-picker)_

```ts
export interface File {
  fileName: string;
  fileType: string;
  uri: string;
}

export interface UploadResponse {
  createdAt: number;
  dirId?: number;
  fileId: number;
  fileName: string;
  fileSize: number;
  path?: string;
  updatedAt: number;
  url: string;
}
```
