import React, { FC, memo, useEffect } from 'react';
import { LayoutChangeEvent } from 'react-native';
import Animated, {
  Easing,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { useSafeState } from '@td-design/rn-hooks';

import Box from '../box';
import Flex from '../flex';
import helpers from '../helpers';
import Text from '../text';
import { AnimatedNoticeProps } from './type';

const { deviceWidth } = helpers;

const AnimatedNotice: FC<AnimatedNoticeProps & { height: number; onContentLayout: (e: LayoutChangeEvent) => void }> = ({
  icon,
  text,
  animated,
  height,
  onContentLayout,
  duration,
}) => {
  const [textWithTail, setTextWithTail] = useSafeState(text);

  useEffect(() => {
    if (animated) {
      text = text.replace(/\s/g, ' ');
      setTextWithTail(text + ' '.repeat(10));
    }
  }, [animated, text]);

  const progress = useSharedValue(0);
  const [textWidth, setTextWidth] = useSafeState(0);

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
  }, [animated]);

  const animatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(progress.value, [0, 1], [0, -textWidth]);

    return {
      transform: [{ translateX }],
    };
  });

  return (
    <Flex justifyContent={'flex-start'} alignItems={'center'}>
      <Box
        backgroundColor="func100"
        height={height}
        zIndex={'99'}
        justifyContent="center"
        alignItems="center"
        paddingHorizontal="x1"
      >
        {icon}
      </Box>
      <Flex width={deviceWidth * 10} onLayout={onContentLayout}>
        <Animated.View style={animatedStyle}>
          <Text variant={'p1'} color="text" numberOfLines={1} onLayout={e => setTextWidth(e.nativeEvent.layout.width)}>
            {textWithTail}
          </Text>
        </Animated.View>
        {animated && (
          <Animated.View style={animatedStyle}>
            <Text variant={'p1'} color="text" numberOfLines={1}>
              {textWithTail}
            </Text>
          </Animated.View>
        )}
      </Flex>
    </Flex>
  );
};
AnimatedNotice.displayName = 'AnimatedNotice';

export default memo(AnimatedNotice);
