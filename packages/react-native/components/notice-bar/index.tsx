import React, { FC, ReactNode, useState } from 'react';
import { useTheme } from '@shopify/restyle';
import Icon from '../icon';
import { Theme } from '../config/theme';
import Box from '../box';
import Text from '../text';
import { TouchableOpacity } from 'react-native';
import { mix, useTransition, useValue, loop } from 'react-native-redash';
import Animated, { Easing, useCode, set } from 'react-native-reanimated';
import { deviceWidth, px } from '../helper';

interface NoticeBarProps {
  /** 左侧自定义图标 */
  icon?: ReactNode;
  /** 通知栏内容 */
  text: string;
  /** 通知栏模式。close表示可关闭；link表示可点击；默认为空 */
  mode?: 'close' | 'link' | '';
  /** 点击事件 */
  onPress?: () => void;
  /** 关闭事件 */
  onClose?: () => void | Promise<void>;
  /** 是否显示滚动动画 */
  animation?: boolean;
  /** 滚动周期 */
  duration?: number;
  /** 滚动方向。rightToLeft表示从右往左；bottomToTop表示从下往上 */
  direction?: 'rightToLeft' | 'bottomToTop';
}

const NoticeBar: FC<NoticeBarProps> = props => {
  const theme = useTheme<Theme>();
  const {
    icon = <Icon name="bells" color={theme.colors.warningColor1} />,
    mode = '',
    text,
    onPress,
    onClose,
    animation = false,
    direction = 'rightToLeft',
  } = props;

  const duration = direction === 'rightToLeft' ? 3000 : 1500;

  /** 关闭效果 */
  const [closed, setClosed] = useState(false);
  const heightAnimation = useTransition(closed, { duration: 300, easing: Easing.inOut(Easing.ease) });
  const height = mix(heightAnimation, px(36), 0);

  /** 关闭事件 */
  const handleClose = () => {
    const originClose = onClose || function () {};
    const res = originClose();
    if (res && res.then) {
      res.then(() => {
        setClosed(true);
      });
    } else {
      setClosed(true);
    }
  };

  /** 滚动效果 */
  const scrollAnimation = useValue(0);
  useCode(
    () =>
      set(
        scrollAnimation,
        loop({
          duration,
          easing: Easing.inOut(Easing.ease),
          boomerang: true,
          autoStart: true,
        })
      ),
    []
  );
  const translateX = mix(scrollAnimation, 0, -deviceWidth);
  const translateY = mix(scrollAnimation, px(36), 0);

  const transform = [];
  if (animation) {
    if (direction === 'rightToLeft') {
      transform.push({ translateX });
    } else {
      transform.push({ translateY });
    }
  }

  const BaseContent = (
    <>
      <Box
        height={px(36)}
        position="absolute"
        zIndex={9}
        left={0}
        paddingHorizontal="xs"
        justifyContent="center"
        backgroundColor="backgroundColor3"
      >
        {icon}
      </Box>
      <Animated.View
        style={{
          paddingLeft: theme.spacing.xxl,
          height: px(36),
          justifyContent: 'center',
          transform,
        }}
      >
        <Box width={deviceWidth * 10}>
          <Text variant="thirdTip">{text}</Text>
        </Box>
      </Animated.View>
    </>
  );

  switch (mode) {
    case 'close':
      return (
        <TouchableOpacity onPress={onPress}>
          <Animated.View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              position: 'relative',
              overflow: 'hidden',
              backgroundColor: theme.colors.backgroundColor3,
              height,
            }}
          >
            {BaseContent}
            <TouchableOpacity
              onPress={handleClose}
              style={{
                paddingHorizontal: theme.spacing.xs,
                position: 'absolute',
                height: px(36),
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
          <Box backgroundColor="backgroundColor3" height={px(36)} position="relative" overflow="hidden">
            {BaseContent}
            <Box
              height={px(36)}
              position="absolute"
              zIndex={9}
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
        <Box backgroundColor="backgroundColor3" height={px(36)} position="relative" overflow="hidden">
          {BaseContent}
        </Box>
      );
  }
};

export default NoticeBar;
