import React, { FC, ReactNode } from 'react';
import { Image as ImageRN, ImageProps as ImagePropsRN, View, StyleSheet, ViewStyle } from 'react-native';
import Animated, { useValue } from 'react-native-reanimated';
import { withTimingTransition } from 'react-native-redash';
import { useTheme } from '@shopify/restyle';

import { Theme } from '../config/theme';

export type ImageProps = ImagePropsRN & {
  // loading时的占位组件
  PlaceholderContent?: ReactNode;
  // loading时的样式
  placeholderStyle?: ViewStyle;
  //动画过度时间
  transitionDuration?: number;
  // 是否需要过度动画
  hasTransition?: boolean;
};

const Image: FC<ImageProps> = props => {
  const theme = useTheme<Theme>();
  const {
    style,
    PlaceholderContent,
    placeholderStyle = {},
    transitionDuration = 400,
    hasTransition = true,
    ...restProps
  } = props;
  const { width, height } = StyleSheet.flatten(style);

  const loadend = useValue<number>(1);
  const transition = withTimingTransition(loadend, { duration: transitionDuration });

  const onLoad = () => {
    hasTransition && loadend.setValue(0);
  };
  return (
    <View
      style={{
        backgroundColor: 'transparent',
        position: 'relative',
        overflow: 'hidden',
        width,
        height,
      }}
    >
      <ImageRN {...restProps} style={style} onLoad={onLoad} />
      {hasTransition && (
        <Animated.View
          style={[
            { ...StyleSheet.absoluteFillObject },
            { backgroundColor: theme.colors.backgroundColor1, justifyContent: 'center', alignItems: 'center' },
            placeholderStyle,
            { opacity: transition },
          ]}
        >
          {PlaceholderContent}
        </Animated.View>
      )}
    </View>
  );
};

export default Image;
