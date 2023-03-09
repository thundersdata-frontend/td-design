import React, { forwardRef, useImperativeHandle } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Shadow } from 'react-native-shadow-2';

import Box from '../box';
import Flex from '../flex';
import helpers from '../helpers';
import SvgIcon from '../svg-icon';
import Text from '../text';
import { normalShadowOpt, NotifyType } from './constant';
import useNotify from './useNotify';

const { px, hexToRgba } = helpers;

const NotifyRoot = forwardRef((_, ref) => {
  const insets = useSafeAreaInsets();
  const { show, shadowColor, bgColor, style, visible, options } = useNotify();

  useImperativeHandle(ref, () => ({
    show,
  }));

  if (!visible || !options) return null;

  const Content = (
    <Flex flex={1} justifyContent="center" alignItems="center">
      {options.type === NotifyType.SUCCESS && (
        <Box marginRight="x1">
          <SvgIcon name="checkcircle" color={shadowColor} />
        </Box>
      )}
      {options.type === NotifyType.FAIL && (
        <Box marginRight="x1">
          <SvgIcon name="closecircleo" color={shadowColor} />
        </Box>
      )}
      <Box>
        <Text style={{ fontSize: px(14), color: shadowColor }}>{options.content}</Text>
      </Box>
    </Flex>
  );

  return (
    <Animated.View
      style={[
        {
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          left: 0,
          right: 0,
          zIndex: 49,
        },
        { bottom: -insets.bottom },
        style,
      ]}
    >
      <Shadow distance={8} startColor={hexToRgba(shadowColor, normalShadowOpt.opacity)}>
        <Flex
          paddingHorizontal="x4"
          justifyContent="center"
          alignItems="center"
          width={normalShadowOpt.width}
          height={normalShadowOpt.height}
          style={{ borderRadius: normalShadowOpt.radius, backgroundColor: bgColor }}
        >
          {options.type === NotifyType.INFO ? (
            <>
              {!!options.onClose && (
                <TouchableOpacity activeOpacity={0.5} onPress={options.onClose} style={styles.content}>
                  {Content}
                  <SvgIcon name="close" color={shadowColor} />
                </TouchableOpacity>
              )}
              {!!options.onPress && (
                <TouchableOpacity activeOpacity={0.5} onPress={options.onPress} style={styles.content}>
                  {Content}
                  <SvgIcon name="right" color={shadowColor} />
                </TouchableOpacity>
              )}
            </>
          ) : (
            Content
          )}
        </Flex>
      </Shadow>
    </Animated.View>
  );
});

export default NotifyRoot;

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
