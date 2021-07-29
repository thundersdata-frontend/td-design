import React, { FC, useCallback, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import FastImage, { FastImageProps, OnProgressEvent } from 'react-native-fast-image';
import { useTheme } from '@shopify/restyle';

import UIActivityIndicator from '../indicator/UIActivityIndicator';
import Box from '../box';
import CircleProgress from '../progress/CircleProgress';
import helpers from '../helpers';
import { Theme } from '../theme';

const { px, ONE_PIXEL } = helpers;
export type ImageProps = Omit<FastImageProps, 'onLoadStart' | 'onProgress' | 'onLoad' | 'onError' | 'onLoadEnd'> & {
  showProgress?: boolean;
};

const Image: FC<ImageProps> = ({ style, showProgress = true, resizeMode = 'cover', ...props }) => {
  const theme = useTheme<Theme>();

  /**
   * 判断图片是网络图片或本地图片
   * 本地图片不需要loading
   * 网络图片需要loading
   */

  const imageLoading = useMemo(() => {
    return typeof props.source === 'object';
  }, [props.source]);

  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  /**
   * 图片请求开始
   */
  const handleStart = useCallback(() => {
    imageLoading && setLoading(true);
  }, [imageLoading]);

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
    const { loaded, total } = e.nativeEvent;
    // 防止出现Infinity的情况
    if (total && loaded) {
      setProgress(Math.round(100 * (loaded / total)));
    }
  }, []);

  const { width = px(100), height = 0 } = StyleSheet.flatten(style);
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
};

export default Image;
