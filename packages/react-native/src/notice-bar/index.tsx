import React, { FC } from 'react';
import { useTheme } from '@shopify/restyle';
import SvgIcon from '../svg-icon';
import { Theme } from '../theme';
import Box from '../box';
import { TouchableOpacity } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { NoticeBarProps } from './type';
import AnimatedNotice, { NOTICE_BAR_HEIGHT, DEFAULT_DURATION } from './AnimatedNotice';

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

  /** 关闭效果 */
  const closed = useSharedValue(false);
  const animatedStyle = useAnimatedStyle(() => ({
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
        <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
          <Animated.View
            style={[
              {
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: theme.colors.background,
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
          <Box backgroundColor="background" style={style} height={height} position="relative" overflow="hidden">
            {BaseContent}
            <Box
              height={height}
              position="absolute"
              zIndex="99"
              right={0}
              paddingHorizontal="x1"
              justifyContent="center"
            >
              <SvgIcon name="right" color={theme.colors.func500} />
            </Box>
          </Box>
        </TouchableOpacity>
      );

    default:
      return (
        <Box backgroundColor="background" style={style} height={height} position="relative" overflow="hidden">
          {BaseContent}
        </Box>
      );
  }
};

export default NoticeBar;
