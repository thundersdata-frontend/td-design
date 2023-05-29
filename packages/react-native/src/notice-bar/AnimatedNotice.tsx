import React, { FC, useEffect, useState } from 'react';
import Animated, {
  Easing,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { Box, Flex, helpers, Text } from '@td-design/react-native';

import { AnimatedNoticeProps } from './type';

const { px, deviceWidth } = helpers;

const AnimatedNotice: FC<AnimatedNoticeProps> = ({ icon, text, height, animated, duration }) => {
  const [textWithTail, setTextWithTail] = useState(text);

  useEffect(() => {
    if (animated) {
      text = text.replace(/\s/g, ' ');
      setTextWithTail(text + ' '.repeat(10));
    }
  }, [animated, text]);

  const progress = useSharedValue(0);
  const [textWidth, setTextWidth] = useState(0);

  const startAnimation = () => {
    progress.value = withTiming(
      1,
      {
        duration,
        easing: Easing.linear,
      },
      () => {
        progress.value = 0;
        runOnJS(startAnimation)();
      }
    );
  };

  useEffect(() => {
    animated && startAnimation();
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(progress.value, [0, 1], [0, -textWidth]);

    return {
      transform: [{ translateX }],
    };
  });

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
      <Flex width={deviceWidth * 10} height={height}>
        <Animated.View style={animatedStyle}>
          <Text variant={'p1'} color="gray500" onLayout={e => setTextWidth(e.nativeEvent.layout.width)}>
            {textWithTail}
          </Text>
        </Animated.View>
        {animated && (
          <Animated.View style={animatedStyle}>
            <Text variant={'p1'} color="gray500">
              {textWithTail}
            </Text>
          </Animated.View>
        )}
      </Flex>
    </>
  );
};
AnimatedNotice.displayName = 'AnimatedNotice';

export default AnimatedNotice;
