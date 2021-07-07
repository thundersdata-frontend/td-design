import React, { FC, useCallback, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import FastImage, { FastImageProps, OnProgressEvent } from 'react-native-fast-image';
import { useTheme } from '@shopify/restyle';

import UIActivityIndicator from '../indicator/UIActivityIndicator';
import Box from '../box';
import CircleProgress from '../progress/CircleProgress';
import helpers from '../helpers';
import { Theme } from '../theme';

const { ONE_PIXEL } = helpers;
export type ImageProps = Omit<FastImageProps, 'onLoadStart' | 'onProgress' | 'onLoad' | 'onError' | 'onLoadEnd'> & {
  showProgress?: boolean;
  hasloading?: boolean;
};

const Image: FC<ImageProps> = ({ hasloading, style, showProgress = true, resizeMode = 'cover', ...props }) => {
  const theme = useTheme<Theme>();

  /**
   *
   * 判断图片是网络图片或本地图片
   * 本地图片不需要loading
   * 网络图片需要loading
   * 如果外部有hasloading属性则根据hasloading处理
   */

  const imageLodding = useMemo(() => {
    if (typeof hasloading === 'undefined') {
      return typeof props.source === 'object';
    }
    return hasloading;
  }, [hasloading, props.source]);

  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  /**
   * 图片请求开始
   */
  const handleStart = useCallback(() => {
    imageLodding && setLoading(true);
  }, [imageLodding]);

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
            <CircleProgress width={+width * 0.5} value={progress} bgColor="transparent" strokeWidth={2} />
          ) : (
            <UIActivityIndicator size={+width * 0.3} color={theme.colors.primary200} />
          )}
        </Box>
      )}
    </FastImage>
  );
};

export default Image;