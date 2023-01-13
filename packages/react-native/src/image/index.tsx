import { useTheme } from '@shopify/restyle';
import { useBoolean } from '@td-design/rn-hooks';
import React, { FC } from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import FastImage, { FastImageProps } from 'react-native-fast-image';

import Box from '../box';
import helpers from '../helpers';
import UIActivityIndicator from '../indicator/UIActivityIndicator';
import Modal from '../modal';
import CircleProgress from '../progress/CircleProgress';
import { Theme } from '../theme';
import useImage from './useImage';

const { px, ONE_PIXEL } = helpers;
export type ImageProps = Omit<FastImageProps, 'onLoadStart' | 'onProgress' | 'onLoad' | 'onError' | 'onLoadEnd'> & {
  /** 是否显示图片加载进度 */
  showProgress?: boolean;
  /** 是否开启点击图片预览大图功能 */
  preview?: boolean;
};

const Image: FC<ImageProps> = ({
  style,
  showProgress = true,
  resizeMode = 'contain',
  source,
  preview = false,
  ...props
}) => {
  const { width = px(100), height = 0 } = StyleSheet.flatten(style);
  const theme = useTheme<Theme>();

  const { loading, progress, handleStart, handleSuccess, handleError, handleProgress } = useImage(source);
  const [visible, { setTrue, setFalse }] = useBoolean(false);

  const Content = (
    <FastImage
      {...props}
      source={source}
      style={[{ borderRadius: theme.borderRadii.x1 }, style]}
      resizeMode={resizeMode}
      onLoadStart={handleStart}
      onLoad={handleSuccess}
      onError={handleError}
      onProgress={handleProgress}
    >
      {loading && (
        <Box
          justifyContent="center"
          alignItems="center"
          borderWidth={ONE_PIXEL}
          borderColor="border"
          borderRadius="x1"
          backgroundColor="background"
          {...{
            width,
            height,
          }}
        >
          {showProgress ? (
            <CircleProgress
              width={Math.min(+width, +height) * 0.5}
              value={progress}
              bgColor="transparent"
              strokeWidth={2}
            />
          ) : (
            <UIActivityIndicator size={Math.min(+width, +height) * 0.3} color={theme.colors.primary200} />
          )}
        </Box>
      )}
    </FastImage>
  );

  if (!preview) return Content;

  return (
    <>
      <TouchableWithoutFeedback onPress={setTrue}>{Content}</TouchableWithoutFeedback>
      <Modal visible={visible} onClose={setFalse} position="fullscreen">
        <TouchableWithoutFeedback onPress={setFalse}>
          <FastImage source={source} style={{ width: '100%', height: '100%' }} resizeMode="contain" />
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

export default Image;
