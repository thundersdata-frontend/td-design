import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import Animated, { Easing, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { useTheme } from '@shopify/restyle';
import { useLatest } from '@td-design/rn-hooks';

import Box from '../box';
import SvgIcon from '../svg-icon';
import { Theme } from '../theme';
import AnimatedNotice, { DEFAULT_DURATION, NOTICE_BAR_HEIGHT } from './AnimatedNotice';
import { NoticeBarProps } from './type';

const NoticeBar: FC<NoticeBarProps> = props => {
  const theme = useTheme<Theme>();
  const {
    icon = <SvgIcon name="bells" color={theme.colors.func500} />,
    mode = '',
    text = '',
    onPress,
    onClose,
    duration = DEFAULT_DURATION,
    animation = false,
    height = NOTICE_BAR_HEIGHT,
    style,
  } = props;

  const onCloseRef = useLatest(onClose);

  /** 关闭效果 */
  const heightAnimation = useSharedValue(height);
  const animatedStyle = useAnimatedStyle(() => ({
    height: heightAnimation.value,
  }));

  /** 关闭事件 */
  const handleClose = () => {
    heightAnimation.value = withTiming(0, { duration: 300, easing: Easing.inOut(Easing.ease) }, finished => {
      if (finished && onCloseRef.current) {
        runOnJS(onCloseRef.current)();
      }
    });
  };

  const BaseContent = <AnimatedNotice {...{ text, icon, duration, height, animation }} />;

  switch (mode) {
    case 'close':
      return (
        <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
          <Animated.View
            style={[
              {
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: theme.colors.func100,
              },
              animatedStyle,
              style,
            ]}
          >
            {BaseContent}
            <TouchableOpacity
              activeOpacity={1}
              onPress={handleClose}
              style={{
                paddingHorizontal: theme.spacing.x1,
                position: 'absolute',
                height,
                zIndex: 9,
                right: 0,
                justifyContent: 'center',
                backgroundColor: theme.colors.func100,
              }}
            >
              <SvgIcon name="close" color={theme.colors.func500} />
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      );

    case 'link':
      return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
          <Box backgroundColor="func100" height={height} style={style} position="relative" overflow="hidden">
            {BaseContent}
            <Box
              height={height}
              position="absolute"
              zIndex="99"
              right={0}
              paddingHorizontal="x1"
              justifyContent="center"
              backgroundColor="func100"
            >
              <SvgIcon name="right" color={theme.colors.func500} />
            </Box>
          </Box>
        </TouchableOpacity>
      );

    default:
      return (
        <Box backgroundColor="func100" height={height} style={style} position="relative" overflow="hidden">
          {BaseContent}
        </Box>
      );
  }
};
NoticeBar.displayName = 'NoticeBar';

export default NoticeBar;
