import React, { FC, useEffect } from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import Box from '../box';
import helpers from '../helpers';
import Text from '../text';
import { AnimatedNoticeProps } from './type';

const { deviceWidth, px } = helpers;
export const NOTICE_BAR_HEIGHT = px(36);
export const DEFAULT_DURATION = 10000;

const AnimatedNotice: FC<AnimatedNoticeProps> = ({
  icon,
  text,
  height = NOTICE_BAR_HEIGHT,
  animation = false,
  duration = DEFAULT_DURATION,
}) => {
  const textWidth = deviceWidth * 2;
  const translateX = useSharedValue(0);
  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  useEffect(() => {
    translateX.value = withSequence(
      withTiming(-textWidth / 2, { duration: duration / 2, easing: Easing.inOut(Easing.ease) }),
      withRepeat(withTiming(textWidth / 3, { duration: duration, easing: Easing.inOut(Easing.ease) }), -1, true),
      withTiming(0, { duration: duration / 2, easing: Easing.inOut(Easing.ease) })
    );
  }, [duration, textWidth, translateX]);

  return (
    <>
      <Box
        width={px(30)}
        height={height}
        backgroundColor="func100"
        position="absolute"
        zIndex="99"
        justifyContent="center"
        alignItems="center"
      >
        {icon}
      </Box>
      <Animated.View
        style={[
          {
            paddingLeft: px(30),
            justifyContent: 'center',
            height,
          },
          animation && !!text ? style : {},
        ]}
      >
        <Box style={{ width: textWidth, overflow: 'hidden' }}>
          <Text variant="p1" color="func500">
            {text}
          </Text>
        </Box>
      </Animated.View>
    </>
  );
};
AnimatedNotice.displayName = 'AnimatedNotice';

export default AnimatedNotice;
