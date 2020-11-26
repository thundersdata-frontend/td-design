import React, { FC, ReactNode, useState } from 'react';
import { Image as ImageRN, ImageProps as ImagePropsRN, View, StyleSheet, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import { useTimingTransition, mix } from 'react-native-redash/lib/module/v1';
import { Theme } from 'components';
import { useTheme } from '@shopify/restyle';

export type ImageProps = ImagePropsRN & {
  // loading时的占位组件
  PlaceholderContent?: ReactNode;
  // loading时的样式
  placeholderStyle?: ViewStyle;
  //动画过度时间
  transitionDuration?: number;
  // 是否需要过度动画
  hasTransition?: number;
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
  const [loadend, setLoadend] = useState(false);
  const transition = useTimingTransition(loadend, { duration: transitionDuration });
  const opacity = mix(transition, 1, 0);

  const onLoad = () => {
    hasTransition && setLoadend(true);
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
            { opacity: opacity },
          ]}
        >
          {PlaceholderContent}
        </Animated.View>
      )}
    </View>
  );
};

export default Image;
