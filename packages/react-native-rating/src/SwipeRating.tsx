import React, { forwardRef, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

import { Flex, Theme, useTheme } from '@td-design/react-native';

import SwipeStar from './components/SwipeStar';
import { SwipeRatingProps } from './type';
import useSwipeRating from './useSwipeRating';

const SwipeRating = forwardRef<unknown, SwipeRatingProps>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (props, _ref) => {
    const theme = useTheme<Theme>();
    const {
      onFinishRating,
      size = 40,
      count = 5,
      rating = count / 2,
      fractions = 2,
      strokeColor = theme.colors.func200,
      ratingBgColor = theme.colors.white,
      ratingFillColor = theme.colors.func200,
    } = props;

    if (size > 80) {
      throw new Error('评分组件最大size不能超过80');
    }

    const { primaryViewStyle, handler } = useSwipeRating({
      fractions,
      size,
      rating,
      count,
      onFinishRating,
      ratingFillColor,
    });

    const Ratings = useMemo(
      () =>
        Array(count)
          .fill('')
          .map((_, index) => (
            <SwipeStar key={index} width={size} height={size} bgColor={ratingBgColor} strokeColor={strokeColor} />
          )),
      [count, ratingBgColor, size, strokeColor]
    );

    const styles = StyleSheet.create({
      content: { flexDirection: 'row', alignItems: 'center', width: count * size },
    });

    return (
      <PanGestureHandler onGestureEvent={handler}>
        <Animated.View style={styles.content}>
          <Flex style={StyleSheet.absoluteFill}>
            <Animated.View style={primaryViewStyle} />
          </Flex>
          <Flex justifyContent="center" alignItems="center">
            {Ratings}
          </Flex>
        </Animated.View>
      </PanGestureHandler>
    );
  }
);

export default SwipeRating;
