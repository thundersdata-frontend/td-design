import React, { FC } from 'react';
import { useTheme } from '@shopify/restyle';
import Icon from '../icon';
import { Theme } from '../config/theme';
import Box from '../box';
import { TouchableOpacity } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { NoticeBarProps } from './type';
import AnimatedNotice, { NOTICE_BAR_HEIGHT, DEFAULT_DURATION } from './AnimatedNotice';

const NoticeBar: FC<NoticeBarProps> = props => {
  const theme = useTheme<Theme>();
  const {
    icon = <Icon name="bells" color={theme.colors.noticebar_icon} />,
    mode = '',
    text = '',
    onPress,
    onClose,
    duration = DEFAULT_DURATION,
    animation = false,
    height = NOTICE_BAR_HEIGHT,
  } = props;

  /** 关闭效果 */
  const closed = useSharedValue(false);
  const style = useAnimatedStyle(() => ({
    height: closed.value ? withTiming(0, { duration: 300, easing: Easing.inOut(Easing.ease) }) : height,
  }));

  /** 关闭事件 */
  const handleClose = () => {
    closed.value = true;
    onClose?.();
  };

  const BaseContent = <AnimatedNotice {...{ text, icon, duration, closed, height, animation }} />;

  switch (mode) {
    case 'close':
      return (
        <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
          <Animated.View
            style={[
              {
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: theme.colors.noticebar_background,
              },
              style,
            ]}
          >
            {BaseContent}
            <TouchableOpacity
              activeOpacity={1}
              onPress={handleClose}
              style={{
                paddingHorizontal: theme.spacing.xs,
                position: 'absolute',
                height,
                zIndex: 9,
                right: 0,
                justifyContent: 'center',
                backgroundColor: theme.colors.noticebar_background,
              }}
            >
              <Icon name="close" color={theme.colors.noticebar_icon} />
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      );

    case 'link':
      return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
          <Box backgroundColor="noticebar_background" height={height} position="relative" overflow="hidden">
            {BaseContent}
            <Box
              height={height}
              position="absolute"
              zIndex="notice"
              right={0}
              paddingHorizontal="xs"
              justifyContent="center"
              backgroundColor="noticebar_background"
            >
              <Icon name="right" color={theme.colors.noticebar_icon} />
            </Box>
          </Box>
        </TouchableOpacity>
      );

    default:
      return (
        <Box backgroundColor="noticebar_background" height={height} position="relative" overflow="hidden">
          {BaseContent}
        </Box>
      );
  }
};

export default NoticeBar;
