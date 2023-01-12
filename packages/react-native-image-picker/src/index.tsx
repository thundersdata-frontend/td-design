import { useTheme } from '@shopify/restyle';
import { ActionSheet, Box, helpers, Indicator, Modal, Theme } from '@td-design/react-native';
import React, { PropsWithChildren } from 'react';
import { Image, Rationale, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { CameraOptions, ImagePickerResponse } from 'react-native-image-picker';

import useImagePicker from './useImagePicker';

const { px, ONE_PIXEL, deviceWidth, deviceHeight } = helpers;
const { UIActivityIndicator } = Indicator;
export interface File {
  fileName: string;
  fileType: string;
  uri: string;
  fileSize?: number;
}

export type ImagePickerProps = PropsWithChildren<{
  /** 宽度 */
  width?: number;
  /** 高度 */
  height?: number;
  /** 当前选择的图片uri */
  value?: string;
  /** 其他图片自定义配置,详细参考react-native-image-picker的option配置 */
  options?: CameraOptions;
  /** 上传图片后是否在背景图展示，如果为 true 上传后会自动展示上传图片(此时只能上传一张) */
  showUploadImg?: boolean;
  /** 上传文件之前的钩子，参数为上传的文件，若返回 false 则停止上传,同时可以在里面执行一些上传提示操作 */
  beforeUpload?: (file: File) => boolean | ((file: File) => Promise<boolean>);
  /** 上传 */
  upload?: (file: File) => Promise<string>;
  /** 上传完成 */
  uploadFinish?: (result?: string) => void;
  /** 取消上传事件回调 */
  onCancel?: (response: ImagePickerResponse) => void;
  /** 上传失败事件回调 */
  onFail?: (response: ImagePickerResponse) => void;
  /** 授权失败的回调 */
  onGrantFail?: () => void;
  /** 打开相册授权的文本 */
  libraryRationale?: Rationale;
  /** 打开摄像头授权的文本 */
  cameraRationale?: Rationale;
  /** 打开相册文本 */
  launchLibraryText?: string;
  /** 打开摄像头文本 */
  launchCameraText?: string;
  /** 预览图片文本 */
  previewImgText?: string;
  /** 删除图片文本 */
  deleteImgText?: string;
}>;

const ImagePicker = (props: ImagePickerProps) => {
  const theme = useTheme<Theme>();
  const {
    value,
    width = px(100),
    height = px(100),
    options,
    showUploadImg = true,
    beforeUpload,
    upload,
    uploadFinish,
    onCancel,
    onFail,
    onGrantFail,
    cameraRationale = {
      title: '获取摄像头权限',
      message: '若不允许，您将无法使用摄像头功能',
      buttonPositive: '同意',
      buttonNegative: '取消',
      buttonNeutral: '下次再说',
    },
    libraryRationale = {
      title: '获取读取文件权限',
      message: '若不允许，您将无法访问图库',
      buttonPositive: '同意',
      buttonNegative: '取消',
      buttonNeutral: '下次再说',
    },
    launchLibraryText = '打开相册',
    launchCameraText = '打开摄像头',
    previewImgText = '预览图片',
    deleteImgText = '删除图片',
  } = props;

  const {
    currentImgSource,
    loading,
    launchLibrary,
    launchCamera,
    launchVisible,
    previewImage,
    deleteImage,
    handlePress,
    handleLongPress,
    previewVisible,
    visible,
    setVisibleFalse,
    setLaunchVisibleFalse,
    setPreviewVisibleFalse,
  } = useImagePicker({
    value,
    options,
    beforeUpload,
    upload,
    uploadFinish,
    onCancel,
    onFail,
    onGrantFail,
    cameraRationale,
    libraryRationale,
  });

  return (
    <Box>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={handlePress}
        onLongPress={handleLongPress}
        disabled={loading}
        style={{ justifyContent: 'center', alignItems: 'center', width, height }}
      >
        {showUploadImg && currentImgSource ? (
          <Image
            source={{ uri: currentImgSource }}
            style={{
              width,
              height,
              borderRadius: theme.borderRadii.x1,
            }}
          />
        ) : (
          props.children
        )}
      </TouchableOpacity>
      {loading && (
        <Box
          width={width}
          height={height}
          borderWidth={ONE_PIXEL}
          borderColor="border"
          borderRadius="x1"
          justifyContent="center"
          alignItems="center"
          backgroundColor="mask"
          position="absolute"
          top={0}
          left={0}
        >
          <UIActivityIndicator size={px(24)} color={theme.colors.primary200} />
        </Box>
      )}
      <ActionSheet
        items={[
          { text: launchLibraryText, onPress: launchLibrary },
          { text: launchCameraText, onPress: launchCamera },
        ]}
        onCancel={setLaunchVisibleFalse}
        visible={launchVisible}
      />
      <ActionSheet
        items={[
          { text: previewImgText, onPress: previewImage },
          { text: deleteImgText, onPress: deleteImage, type: 'danger' },
        ]}
        onCancel={setVisibleFalse}
        visible={visible}
      />
      <Modal visible={previewVisible} onClose={setPreviewVisibleFalse} position="fullscreen">
        <TouchableWithoutFeedback onPress={setPreviewVisibleFalse}>
          <Image
            source={{ uri: currentImgSource }}
            style={{
              width: deviceWidth,
              height: deviceHeight,
            }}
            resizeMode="cover"
          />
        </TouchableWithoutFeedback>
      </Modal>
    </Box>
  );
};

export default ImagePicker;
