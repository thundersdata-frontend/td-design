import React from 'react';
import { useState } from 'react';
import { useCallback } from 'react';
import { FC } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import FastImage, { FastImageProps, OnProgressEvent } from 'react-native-fast-image';
import CircleProgress from '../progress/CircleProgress';
import { ONE_PIXEL } from '../helper';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../config/theme';
import Box from '../box';

export type ImageProps = Omit<FastImageProps, 'onLoadStart' | 'onProgress' | 'onLoad' | 'onError' | 'onLoadEnd'> & {
  showProgress?: boolean;
};

const Image: FC<ImageProps> = ({ style, showProgress = true, resizeMode = 'cover', ...props }) => {
  const theme = useTheme<Theme>();

  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  /**
   * 图片请求开始
   */
  const handleStart = useCallback(() => {
    setLoading(true);
  }, []);

  /**
   * 图片请求成功
   */
  const handleSuccess = useCallback(() => {
    setLoading(false);
  }, []);

  /**
   * 图片请求失败
   */
  const handleError = useCallback(() => {
    setLoading(false);
  }, []);

  /**
   * 图片请求进度
   */
  const handleProgress = useCallback((e: OnProgressEvent) => {
    setProgress(Math.round(100 * (e.nativeEvent.loaded / e.nativeEvent.total)));
  }, []);

  const { width = 100, height } = StyleSheet.flatten(style);
  return (
    <FastImage
      {...props}
      style={[{ borderRadius: theme.borderRadii.base }, style]}
      resizeMode={resizeMode}
      onLoadStart={handleStart}
      onLoad={handleSuccess}
      onError={handleError}
      onProgress={handleProgress}
    >
      {loading && (
        <Box
          {...{
            width,
            height,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: ONE_PIXEL,
            borderColor: 'image_border',
            backgroundColor: 'image_background',
          }}
        >
          {showProgress ? (
            <CircleProgress width={+width * 0.7} value={progress} bgColor="transparent" strokeWidth={2} />
          ) : (
            <ActivityIndicator size="small" color="black" />
          )}
        </Box>
      )}
    </FastImage>
  );
};

export default Image;
