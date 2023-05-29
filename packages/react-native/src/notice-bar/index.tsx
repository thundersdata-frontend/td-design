import React, { FC, PropsWithChildren, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Animated, { Easing, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { useTheme } from '@shopify/restyle';
import { Box, helpers, SvgIcon, Theme } from '@td-design/react-native';

import AnimatedNotice from './AnimatedNotice';
import { NoticeBarProps } from './type';

const { px } = helpers;
const NOTICE_BAR_HEIGHT = px(36);
const DEFAULT_DURATION = 5000;

const NoticeBar: FC<NoticeBarProps> = props => {
  const theme = useTheme<Theme>();
  const {
    icon = <SvgIcon name="bells" color={theme.colors.func500} />,
    mode = '',
    text = '',
    onPress,
    onClose,
    duration = DEFAULT_DURATION,
    animated = false,
    height = NOTICE_BAR_HEIGHT,
    style,
    activeOpacity = 0.5,
  } = props;

  const [visible, setVisible] = useState(true);

  /** 关闭效果 */
  const heightAnimation = useSharedValue(height);
  const animatedStyle = useAnimatedStyle(() => ({
    height: heightAnimation.value,
  }));

  const _handleClose = () => {
    setVisible(false);
    onClose?.();
  };

  /** 关闭事件 */
  const handleClose = () => {
    heightAnimation.value = withTiming(0, { duration: 300, easing: Easing.inOut(Easing.ease) }, finished => {
      if (finished) {
        runOnJS(_handleClose)();
      }
    });
  };

  if (!visible) return null;

  const BaseContent = <AnimatedNotice {...{ text, icon, duration, height, animated }} />;

  const WrapComp = ({ children }: PropsWithChildren<{}>) => {
    if (onPress)
      return (
        <TouchableOpacity activeOpacity={activeOpacity} onPress={onPress}>
          {children}
        </TouchableOpacity>
      );
    return <>{children}</>;
  };

  switch (mode) {
    case 'close':
      return (
        <WrapComp>
          <Animated.View
            style={[
              {
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
        </WrapComp>
      );

    case 'link':
      return (
        <WrapComp>
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
        </WrapComp>
      );

    default:
      return (
        <WrapComp>
          <Box backgroundColor="func100" height={height} style={style} position="relative" overflow="hidden">
            {BaseContent}
          </Box>
        </WrapComp>
      );
  }
};
NoticeBar.displayName = 'NoticeBar';

export default NoticeBar;
