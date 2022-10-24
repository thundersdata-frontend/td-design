import { useTheme } from '@shopify/restyle';
import { Flex, Theme } from '@td-design/react-native';
import React, { forwardRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

import SwipeStar from './components/SwipeStar';
import { SwipeRatingProps } from './type';
import useSwipeRating from './useSwipeRating';

const SwipeRating = forwardRef<unknown, SwipeRatingProps>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ onFinishRating, size = 40, count = 5, rating = count / 2, fractions = 2, ...restProps }, _ref) => {
    const theme = useTheme<Theme>();
    const {
      strokeColor = theme.colors.func200,
      ratingBgColor = theme.colors.background,
      ratingFillColor = theme.colors.func200,
    } = restProps;

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
  }
);

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
