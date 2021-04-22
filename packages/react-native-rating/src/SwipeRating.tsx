import React, { FC, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { helpers, useTheme, Theme, Flex } from '@td-design/react-native';
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  interpolate,
  Extrapolate,
  runOnJS,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { SwipeRatingProps } from './type';
import SwipeStar from './components/SwipeStar';

const { px } = helpers;
const SwipeRating: FC<SwipeRatingProps> = ({
  onFinishRating,
  size = px(40),
  count = 5,
  defaultRating = count / 2,
  minValue = 0,
  fractions = 2,
  ...restProps
}) => {
  const theme = useTheme<Theme>();
  const {
    strokeColor = theme.colors.rating_swipe_star_stroke,
    ratingBgColor = theme.colors.rating_swipe_background,
    ratingFillColor = theme.colors.rating_swipe_fill_background,
  } = restProps;

  const getCurrentRating = (translateValue: number) => {
    const startingValue = count / 2;
    let currentRating = minValue;

    if (translateValue > (count * size) / 2) {
      currentRating = count;
    } else if (translateValue < (-count * size) / 2) {
      currentRating = minValue;
    } else if (translateValue <= size || translateValue > size) {
      currentRating = startingValue + translateValue / size;
      currentRating = !fractions ? Math.ceil(currentRating) : +currentRating.toFixed(fractions);
    } else {
      currentRating = !fractions ? Math.ceil(startingValue) : +startingValue.toFixed(fractions);
    }
    return currentRating;
  };

  const translateX = useSharedValue(0);

  useEffect(() => {
    const setCurrentRating = (rating: number) => {
      const initialRating = count / 2;

      let value = 0;
      if (rating > count) {
        value = (count * size) / 2;
      } else if (rating < 0) {
        value = (-count * size) / 2;
      } else if (rating < count / 2 || rating > count / 2) {
        value = (rating - initialRating) * size;
      } else {
        value = 0;
      }
      translateX.value = value;
    };

    setCurrentRating(defaultRating);
  }, [count, defaultRating, size, translateX]);

  const handler = useAnimatedGestureHandler({
    onStart(_, ctx: Record<string, number>) {
      ctx.offsetX = translateX.value;
    },
    onActive(event, ctx) {
      translateX.value = event.translationX + ctx.offsetX;
    },
    onEnd() {
      const currentRating = getCurrentRating(translateX.value);
      onFinishRating && runOnJS(onFinishRating)(currentRating);
    },
  });

  const getPrimaryViewStyle = useAnimatedStyle(() => {
    const width = interpolate(
      translateX.value,
      [-count * (size / 2), 0, count * (size / 2)],
      [0, (count * size) / 2, count * size],
      Extrapolate.CLAMP
    );

    return {
      backgroundColor: ratingFillColor,
      width,
      height: width ? size : 0,
    };
  });

  const getSecondaryViewStyle = useAnimatedStyle(() => {
    const width = interpolate(
      translateX.value,
      [-count * (size / 2), 0, count * (size / 2)],
      [count * size, (count * size) / 2, 0],
      Extrapolate.CLAMP
    );

    return {
      backgroundColor: ratingBgColor,
      width,
      height: width ? size : 0,
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
      <Animated.View style={styles.startsWrapper}>
        <View style={styles.starsInsideWrapper}>
          <Animated.View style={getPrimaryViewStyle} />
          <Animated.View style={getSecondaryViewStyle} />
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  starsInsideWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
