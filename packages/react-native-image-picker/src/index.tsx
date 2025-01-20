import React, { forwardRef, useImperativeHandle } from 'react';
import { Image } from 'react-native';
import { CameraOptions } from 'react-native-image-picker';

import { Box, helpers, Indicator, Pressable, Theme, useTheme } from '@td-design/react-native';

import { ImagePickerProps, ImagePickerRef } from './type';
import useImagePicker from './useImagePicker';

const { px, ONE_PIXEL } = helpers;
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

    const { currentImgSource, loading, handlePress } = useImagePicker({
      value,
      showUploadImg,
      options,
      onBeforeUpload,
      onUpload,
      onAfterUpload,
      onCancel,
      onFail,
      onGrantFail,
      launchLibraryText,
      launchCameraText,
    });

    useImperativeHandle(ref, () => ({}));

    return (
      <Box>
        <Pressable
          activeOpacity={activeOpacity}
          onPress={handlePress}
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
      </Box>
    );
  }
);

export default ImagePicker;
