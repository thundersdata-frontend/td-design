import React, { FC, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@shopify/restyle';
import { Theme, Flex } from '@td-design/react-native';
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  runOnJS,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';

import SwipeStar from './components/SwipeStar';
import { SwipeRatingProps } from './type';

const SwipeRating: FC<SwipeRatingProps> = ({
  onFinishRating,
  size = 40,
  count = 5,
  rating = count / 2,
  fractions = 2,
  ...restProps
}) => {
  const theme = useTheme<Theme>();
  const {
    strokeColor = theme.colors.func200,
    ratingBgColor = theme.colors.background,
    ratingFillColor = theme.colors.func200,
  } = restProps;

  if (size > 80) {
    throw new Error('评分组件最大size不能超过80');
  }

  const getCurrentRating = (translateX: number) => {
    'worklet';
    return !fractions ? Math.ceil(translateX / size) : +(translateX / size).toFixed(fractions);
  };

  const translateX = useSharedValue(0);

  useEffect(() => {
    translateX.value = rating * size;
  }, [rating, size, translateX]);

  const handler = useAnimatedGestureHandler({
    onStart(_, ctx: Record<string, number>) {
      ctx.offsetX = translateX.value;
    },
    onActive(event, ctx) {
      const value = event.translationX + ctx.offsetX;
      translateX.value = value >= count * size ? count * size : value;
    },
    onEnd() {
      const currentRating = getCurrentRating(translateX.value);
      onFinishRating && runOnJS(onFinishRating)(currentRating);
    },
  });

  const primaryViewStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: ratingFillColor,
      width: translateX.value,
      height: size - 1,
    };
  });

  const renderRatings = () => {
    return Array(count)
      .fill('')
      .map((_, index) => (
        <SwipeStar key={index} width={size} height={size} bgColor={ratingBgColor} strokeColor={strokeColor} />
      ));
  };

  return (
    <PanGestureHandler onGestureEvent={handler}>
      <Animated.View style={[styles.startsWrapper, { width: count * size }]}>
        <View style={[styles.starsInsideWrapper]}>
          <Animated.View style={primaryViewStyle} />
        </View>
        <Flex justifyContent="center" alignItems="center">
          {renderRatings()}
        </Flex>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default SwipeRating;

const styles = StyleSheet.create({
  startsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starsInsideWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
