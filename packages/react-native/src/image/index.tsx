import React, { FC, useMemo } from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import FastImage, { FastImageProps } from 'react-native-fast-image';
import { useTheme } from '@shopify/restyle';
import { useBoolean, useCreation } from '@td-design/rn-hooks';

import UIActivityIndicator from '../indicator/UIActivityIndicator';
import Box from '../box';
import CircleProgress from '../progress/CircleProgress';
import helpers from '../helpers';
import { Theme } from '../theme';
import useImage from './useImage';
import Modal from '../modal';

const { px, ONE_PIXEL } = helpers;
export type ImageProps = Omit<FastImageProps, 'onLoadStart' | 'onProgress' | 'onLoad' | 'onError' | 'onLoadEnd'> & {
  showProgress?: boolean;
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

  const Content = useCreation(
    () => (
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
    ),
    [
      handleError,
      handleProgress,
      handleStart,
      handleSuccess,
      height,
      loading,
      progress,
      props,
      resizeMode,
      showProgress,
      source,
      style,
      theme.borderRadii.x1,
      theme.colors.primary200,
      width,
    ]
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
