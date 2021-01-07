import React, { FC } from 'react';
import { useTheme } from '@shopify/restyle';
import Icon from '../icon';
import { Theme } from '../config/theme';
import Box from '../box';
import { TouchableOpacity } from 'react-native';
import { mix, withTransition } from 'react-native-redash';
import Animated, { Easing, useValue } from 'react-native-reanimated';
import { NoticeBarProps } from './type';
import AnimatedNotice, { NOTICE_BAR_HEIGHT, DEFAULT_DURATION } from './AnimatedNotice';

const NoticeBar: FC<NoticeBarProps> = props => {
  const theme = useTheme<Theme>();
  const {
    icon = <Icon name="bells" color={theme.colors.warningColor1} />,
    mode = '',
    text = '',
    onPress,
    onClose,
    duration = DEFAULT_DURATION,
    animation = false,
    height = NOTICE_BAR_HEIGHT,
  } = props;

  /** 关闭效果 */
  const closed = useValue<number>(0);
  const heightAnimation = withTransition(closed, { duration: 300, easing: Easing.inOut(Easing.ease) });
  const animatedHeight = mix(heightAnimation, height, 0);

  /** 关闭事件 */
  const handleClose = () => {
    const originClose = onClose || function () {};
    const res = originClose();
    if (res && res.then) {
      res.then(() => {
        closed.setValue(1);
      });
    } else {
      closed.setValue(1);
    }
  };

  const BaseContent = <AnimatedNotice {...{ text, icon, duration, closed, height, animation }} />;

  switch (mode) {
    case 'close':
      return (
        <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
          <Animated.View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              position: 'relative',
              overflow: 'hidden',
              backgroundColor: theme.colors.backgroundColor3,
              height: animatedHeight,
            }}
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
                backgroundColor: theme.colors.backgroundColor3,
              }}
            >
              <Icon name="close" color={theme.colors.warningColor1} />
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      );

    case 'link':
      return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
          <Box backgroundColor="backgroundColor3" height={height} position="relative" overflow="hidden">
            {BaseContent}
            <Box
              height={height}
              position="absolute"
              zIndex="notice"
              right={0}
              paddingHorizontal="xs"
              justifyContent="center"
              backgroundColor="backgroundColor3"
            >
              <Icon name="right" color={theme.colors.warningColor1} />
            </Box>
          </Box>
        </TouchableOpacity>
      );

    default:
      return (
        <Box backgroundColor="backgroundColor3" height={height} position="relative" overflow="hidden">
          {BaseContent}
        </Box>
      );
  }
};

export default NoticeBar;
