import React, { FC } from 'react';
import { mix, loop, useClock } from 'react-native-redash';
import Animated, { Easing, useCode, set, useValue, block, cond, neq, stopClock } from 'react-native-reanimated';
import { deviceWidth, px } from '../helper';
import Box from '../box';
import Text from '../text';
import { AnimatedNoticeProps } from './type';

export const NOTICE_BAR_HEIGHT = px(36);
export const DEFAULT_DURATION = 5000;

const HorizontalNotice: FC<AnimatedNoticeProps> = ({
  icon,
  duration = DEFAULT_DURATION,
  text,
  closed,
  height = NOTICE_BAR_HEIGHT,
  animation = false,
}) => {
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
    [closed]
  );
  const translateX = mix(scrollAnimation, 0, -deviceWidth + px(40));
  const transform = animation ? [{ translateX }] : [];

  return (
    <>
      <Box
        width={px(30)}
        height={height}
        position="absolute"
        zIndex="notice"
        justifyContent="center"
        alignItems="center"
        backgroundColor="backgroundColor3"
      >
        {icon}
      </Box>
      <Animated.View
        style={{
          paddingLeft: px(30),
          justifyContent: 'center',
          height,
          transform,
        }}
      >
        <Box width={deviceWidth * 100}>
          <Text variant="thirdTip">{text}</Text>
        </Box>
      </Animated.View>
    </>
  );
};

export default HorizontalNotice;
