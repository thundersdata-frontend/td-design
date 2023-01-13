---
title: ImagePicker - 图片选择组件
nav:
  title: RN组件
  path: /react-native
group:
  title: ImagePicker
  path: /image-picker
---

# ImagePicker 图片选择组件

使用本组件需要单独安装：**yarn add @td-design/react-native-image-picker react-native-image-picker**

该组件依赖[react-native-image-picker](https://github.com/react-native-image-picker/react-native-image-picker)

## 效果演示

### 1. 简单用法

```tsx | pure
import { helpers, Image } from '@td-design/react-native';
import ImagePicker from '@td-design/react-native-image-picker';

const { px } = helpers;

const APP = () => {
  return (
    <ImagePicker onGrantFail={() => Toast.bottom({ content: '对不起，授权失败' })} upload={file => file.uri}>
      <Image source={require('./assets/img-add-complete.webp')} style={{ width: px(100), height: px(100) }} />
    </ImagePicker>
  );
};
```

<center>
  <figure>
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1673597570320504020.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

### 2. 自定义上传文字和图标

```tsx | pure
import { Box, helpers, Image, Text, Toast } from '@td-design/react-native';
import ImagePicker from '@td-design/react-native-image-picker';

const { px } = helpers;

const APP = () => {
  return (
    <ImagePicker onGrantFail={() => Toast.bottom({ content: '对不起，授权失败' })} upload={file => file.uri}>
      <Box
        justifyContent="center"
        alignItems="center"
        width={100}
        height={100}
        borderWidth={1}
        borderColor="border"
        borderStyle="dashed"
        borderRadius="x1"
      >
        <Image source={require('./assets/img-add.webp')} style={{ width: px(44), height: px(44) }} />
        <Text variant="p3" color="gray300" marginTop="x1">
          上传图片
        </Text>
      </Box>
    </ImagePicker>
  );
};
```

<center>
  <figure>
    <img
      alt=""
      src="https://td-dev-public.oss-cn-hangzhou.aliyuncs.com/maoyes-app/1673596506190144658.gif"
      style="width: 375px; margin-right: 10px; border: 1px solid #ddd;"
    />
  </figure>
</center>

## API

| 属性 | 必填 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- | --- |
| width | `false` | 宽度 | `number` | `100` |
| height | `false` | 高度 | `number` | `100` |
| value | `false` | 当前选择的图片 uri | `string` |  |
| options | `false` | 其他图片自定义配置 | `CameraOptions` |  |
| showUploadImg | `false` | 上传图片后是否在背景图展示 | `boolean` | `true` |
| beforeUpload | `false` | 上传文件之前的钩子 | `(file: File) => boolean \| Promise<boolean>` |  |
| upload | `false` | 上传 | `(file: File) => Promise<string>` |  |
| uploadFinish | `false` | 上传完成 | `(result?: string) => void` |  |
| onCancel | `false` | 取消上传事件回调 | `(response: ImagePickerResponse) => void` |  |
| onFail | `false` | 上传失败事件回调 | `(response: ImagePickerResponse) => void` |  |
| onGrantFail | `false` | 授权失败的回调 | `() => void` |  |
| libraryRationale | `false` | 打开相册授权的文本 | `Rationale` |  |
| cameraRationale | `false` | 打开摄像头授权的文本 | `Rationale` |  |
| launchLibraryText | `false` | 打开相册文本 | `string` | `打开相册` |
| launchCameraText | `false` | 打开摄像头文本 | `string` | `打开摄像头` |
| previewImgText | `false` | 预览图片文本 | `string` | `预览图片` |
| deleteImgText | `false` | 删除图片文本 | `string` | `删除图片` |

_`CameraOptions`来自 [react-native-image-picker](https://github.com/react-native-image-picker/react-native-image-picker)_

```ts
export interface File {
  fileName: string;
  fileType: string;
  uri: string;
  fileSize?: number;
}
```
