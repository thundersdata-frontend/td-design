import React, { FC } from 'react';
import { useTheme } from '@shopify/restyle';
import { mix, loop, useClock } from 'react-native-redash/lib/module/v1';
import Animated, { Easing, useCode, set, useValue, block, cond, neq, stopClock } from 'react-native-reanimated';
import { deviceWidth, px } from '../helper';
import Box from '../box';
import Text from '../text';
import { Theme } from '../config/theme';
import { HorizontalNoticeProps } from './type';

const HorizontalNotice: FC<HorizontalNoticeProps> = ({ icon, duration = 3000, animation = true, data, closed }) => {
  const theme = useTheme<Theme>();
  const clock = useClock();

  /** 滚动效果 */
  const scrollAnimation = useValue(0);
  useCode(
    () =>
      block([
        cond(
          neq(closed, 1),
          set(
            scrollAnimation,
            loop({
              duration,
              easing: Easing.inOut(Easing.ease),
              boomerang: true,
              autoStart: true,
              clock,
            })
          ),
          stopClock(clock)
        ),
      ]),
    []
  );
  const translateX = mix(scrollAnimation, 0, -deviceWidth);

  const transform = [];
  if (animation) {
    transform.push({ translateX });
  }

  return (
    <>
      <Box
        height={px(36)}
        position="absolute"
        zIndex="notice"
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
          <Text variant="thirdTip">{data[0]}</Text>
        </Box>
      </Animated.View>
    </>
  );
};

export default HorizontalNotice;
