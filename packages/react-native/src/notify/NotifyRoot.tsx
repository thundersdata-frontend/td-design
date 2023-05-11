import React, { forwardRef, useImperativeHandle } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Shadow } from 'react-native-shadow-2';

import Box from '../box';
import Flex from '../flex';
import helpers from '../helpers';
import Pressable from '../pressable';
import SvgIcon from '../svg-icon';
import Text from '../text';
import { normalShadowOpt, NotifyType } from './constant';
import useNotify from './useNotify';

const { px, hexToRgba } = helpers;

const NotifyRoot = forwardRef((_, ref) => {
  const insets = useSafeAreaInsets();
  const { show, hide, shadowColor, bgColor, style, visible, options } = useNotify();

  useImperativeHandle(ref, () => ({
    show,
  }));

  if (!visible || !options) return null;

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      left: 0,
      right: 0,
      zIndex: 49,
      bottom: -insets.bottom,
    },
    content: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    wrapper: { borderRadius: normalShadowOpt.radius, backgroundColor: bgColor },
  });

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

  /**
   * 渲染Notify内容。分为以下几种情况：
   * 1. notify的类型不是INFO，这时候直接返回Content
   * 2. notify类型是INFO：
   *    1: onPress有值，Content被TouchableOpacity包裹，同时显示right图标；
   *       如果同时onClose有值，再显示一个close图标，点击可关闭notify
   *    2: onPress没有值，Contentbu包裹，不显示right图标；
   *       如果同时onClose有值，再显示一个close图标，点击可关闭notify
   */
  const renderContent = () => {
    if (options.type !== NotifyType.INFO) return Content;

    if (options.onPress) {
      if (options.onClose) {
        return (
          <TouchableOpacity activeOpacity={0.5} onPress={options.onPress} style={styles.content}>
            {Content}
            <Pressable
              onPress={e => {
                e.stopPropagation();
                hide();
              }}
            >
              <SvgIcon name="close" color={shadowColor} />
            </Pressable>
            <SvgIcon name="right" color={shadowColor} />
          </TouchableOpacity>
        );
      }
      return (
        <TouchableOpacity activeOpacity={0.5} onPress={options.onPress} style={styles.content}>
          {Content}
          <SvgIcon name="right" color={shadowColor} />
        </TouchableOpacity>
      );
    }

    if (options.onClose) {
      return (
        <Flex justifyContent={'center'} alignItems={'center'}>
          {Content}
          <Pressable
            onPress={e => {
              e.stopPropagation();
              hide();
            }}
          >
            <SvgIcon name="close" color={shadowColor} />
          </Pressable>
        </Flex>
      );
    }
    return Content;
  };

  return (
    <Animated.View style={[styles.container, style]}>
      <Shadow distance={8} startColor={hexToRgba(shadowColor, normalShadowOpt.opacity)}>
        <Flex
          paddingHorizontal="x4"
          justifyContent="center"
          alignItems="center"
          width={normalShadowOpt.width}
          height={normalShadowOpt.height}
          style={styles.wrapper}
        >
          {renderContent()}
        </Flex>
      </Shadow>
    </Animated.View>
  );
});

export default NotifyRoot;
