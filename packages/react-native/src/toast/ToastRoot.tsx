import { useTheme } from '@shopify/restyle';
import React, { forwardRef, useImperativeHandle } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Box from '../box';
import helpers from '../helpers';
import Text from '../text';
import useToast from './useToast';

const ToastRoot = forwardRef((_, ref) => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const { show, hide, visible, options } = useToast();

  useImperativeHandle(ref, () => ({
    show,
    hide,
  }));

  if (!visible || !options) return null;

  let contentStyle = {};
  switch (options.position) {
    case 'top':
      contentStyle = {
        top: insets.top + helpers.px(100),
      };
      break;
    case 'bottom':
      contentStyle = {
        bottom: insets.bottom + helpers.px(50),
      };
      break;
    case 'middle':
      contentStyle = {
        top: insets.top + helpers.deviceHeight / 2,
      };
      break;
    default:
      contentStyle = {};
  }

  const Content = (
    <Animated.View
      style={[
        { justifyContent: 'center', alignItems: 'center', position: 'absolute', width: helpers.deviceWidth },
        contentStyle,
      ]}
    >
      <Box
        minWidth={helpers.px(80)}
        padding="x3"
        borderRadius="x1"
        justifyContent="center"
        alignItems="center"
        backgroundColor="gray400"
        position="absolute"
      >
        {options.indicator && (
          <Box marginBottom={'x2'}>
            <ActivityIndicator size={helpers.px(20)} color={theme.colors.gray50} />
          </Box>
        )}
        <Text variant="p1" color="gray50">
          {options.content}
        </Text>
      </Box>
    </Animated.View>
  );

  if (options.mask) {
    return (
      <Box style={StyleSheet.absoluteFillObject} backgroundColor="mask">
        {Content}
      </Box>
    );
  }
  return Content;
});

export default ToastRoot;