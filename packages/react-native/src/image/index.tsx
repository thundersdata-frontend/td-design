import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import FastImage, { FastImageProps } from 'react-native-fast-image';
import { useTheme } from '@shopify/restyle';

import UIActivityIndicator from '../indicator/UIActivityIndicator';
import Box from '../box';
import CircleProgress from '../progress/CircleProgress';
import helpers from '../helpers';
import { Theme } from '../theme';
import useImage from './useImage';

const { px, ONE_PIXEL } = helpers;
export type ImageProps = Omit<FastImageProps, 'onLoadStart' | 'onProgress' | 'onLoad' | 'onError' | 'onLoadEnd'> & {
  showProgress?: boolean;
};

const Image: FC<ImageProps> = ({ style, showProgress = true, resizeMode = 'cover', source, ...props }) => {
  const theme = useTheme<Theme>();
  const { loading, progress, handleStart, handleSuccess, handleError, handleProgress } = useImage(source);

  const { width = px(100), height = 0 } = StyleSheet.flatten(style);
  return (
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
};

export default Image;
