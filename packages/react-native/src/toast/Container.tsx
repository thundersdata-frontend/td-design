import { useTheme } from '@shopify/restyle';
import React, { FC, ReactNode, useMemo } from 'react';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Theme } from '..';
import Box from '../box';
import helpers from '../helpers';
import UIActivityIndicator from '../indicator/UIActivityIndicator';
import Text from '../text';
import { useToast } from './useToast';

export interface ToastProps {
  content: ReactNode;
  position: 'top' | 'middle' | 'bottom';
  duration: number;
  mask?: boolean;
  indicator?: boolean;
}

const { px } = helpers;
const Container: FC<ToastProps & { onClose: () => void }> = ({
  content,
  position,
  duration,
  onClose,
  mask = false,
  indicator = false,
}) => {
  const theme = useTheme<Theme>();
  const insets = useSafeAreaInsets();
  const opacity = useToast({ duration, onClose });

  const aStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const contentStyle = useMemo(() => {
    switch (position) {
      case 'top':
        return {
          top: insets.top + helpers.px(100),
        };

      case 'bottom':
        return {
          bottom: insets.bottom + helpers.px(50),
        };

      case 'middle':
        return {
          top: insets.top + helpers.deviceHeight / 2,
        };

      default:
        return {};
    }
  }, [insets.bottom, insets.top, position]);

  const Content = useMemo(() => {
    return (
      <Animated.View
        style={[
          { justifyContent: 'center', alignItems: 'center', position: 'absolute', width: helpers.deviceWidth },
          contentStyle,
          aStyle,
        ]}
      >
        <Box
          minWidth={px(80)}
          padding="x3"
          borderRadius="x1"
          justifyContent="center"
          alignItems="center"
          backgroundColor="gray400"
          position="absolute"
        >
          {indicator && (
            <Box marginBottom={'x2'}>
              <UIActivityIndicator size={helpers.px(20)} color={theme.colors.gray50} />
            </Box>
          )}
          <Text variant="p1" color="gray50">
            {content}
          </Text>
        </Box>
      </Animated.View>
    );
  }, [aStyle, content, contentStyle, indicator, theme.colors.gray50]);

  if (mask) {
    return (
      <Box flex={1} width="100%" justifyContent={'center'} alignItems="center" backgroundColor="mask">
        {Content}
      </Box>
    );
  }
  return Content;
};

export default Container;
