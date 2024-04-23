import React, { forwardRef, useImperativeHandle } from 'react';
import { Image, TouchableWithoutFeedback } from 'react-native';
import { CameraOptions } from 'react-native-image-picker';

import { ActionSheet, Box, helpers, Indicator, Modal, Pressable, Theme, useTheme } from '@td-design/react-native';

import { ImagePickerProps, ImagePickerRef } from './type';
import useImagePicker from './useImagePicker';

const { px, ONE_PIXEL, deviceWidth, deviceHeight } = helpers;
const { UIActivityIndicator } = Indicator;

const cameraOptions: CameraOptions = {
  mediaType: 'photo',
  includeBase64: true,
  quality: 1,
  saveToPhotos: false,
  durationLimit: 15,
};

const ImagePicker = forwardRef<ImagePickerRef, ImagePickerProps>(
  (
    {
      value,
      width = px(100),
      height = px(100),
      options = cameraOptions,
      showUploadImg = true,
      launchLibraryText = '打开相册',
      launchCameraText = '打开摄像头',
      previewImgText = '预览图片',
      deleteImgText = '删除图片',
      children,
      onBeforeUpload,
      onUpload,
      onAfterUpload,
      onCancel,
      onFail,
      onGrantFail,
      activeOpacity = 0.6,
    },
    ref
  ) => {
    const theme = useTheme<Theme>();

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
      showUploadImg,
      options,
      onBeforeUpload,
      onUpload,
      onAfterUpload,
      onCancel,
      onFail,
      onGrantFail,
    });

    useImperativeHandle(ref, () => ({}));

    return (
      <Box>
        <Pressable
          activeOpacity={activeOpacity}
          onPress={handlePress}
          onLongPress={handleLongPress}
          disabled={loading}
          style={{ justifyContent: 'center', alignItems: 'flex-start', width, height }}
        >
          {!!currentImgSource ? (
            <Image
              source={{ uri: currentImgSource }}
              style={{
                width,
                height,
              }}
            />
          ) : (
            children
          )}
        </Pressable>
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
        {/* 打开相册或者打开相机 */}
        <ActionSheet
          items={[
            { text: launchLibraryText, onPress: launchLibrary },
            { text: launchCameraText, onPress: launchCamera },
          ]}
          onCancel={setLaunchVisibleFalse}
          visible={launchVisible}
        />
        {/* 预览图片或者删除图片 */}
        <ActionSheet
          items={[
            { text: previewImgText, onPress: previewImage },
            { text: deleteImgText, onPress: deleteImage, type: 'danger' },
          ]}
          onCancel={setVisibleFalse}
          visible={visible}
        />
        {/* 弹窗预览图片 */}
        <Modal visible={previewVisible} onClose={setPreviewVisibleFalse} position="fullscreen">
          <TouchableWithoutFeedback onPress={setPreviewVisibleFalse}>
            <Image
              source={{ uri: currentImgSource }}
              style={{
                width: deviceWidth,
                height: deviceHeight,
              }}
              resizeMode="contain"
            />
          </TouchableWithoutFeedback>
        </Modal>
      </Box>
    );
  }
);

export default ImagePicker;
