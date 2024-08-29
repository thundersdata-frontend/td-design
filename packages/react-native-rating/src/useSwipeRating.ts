import { useEffect } from 'react';
import { runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

import { SwipeRatingProps } from './type';

export default function useSwipeRating({
  onFinishRating,
  size = 40,
  count = 5,
  rating = count / 2,
  fractions = 2,
  ratingFillColor,
}: Pick<SwipeRatingProps, 'size' | 'count' | 'rating' | 'fractions' | 'onFinishRating'> & { ratingFillColor: string }) {
  const translateX = useSharedValue(0);

  const getCurrentRating = (translateX: number) => {
    'worklet';
    return !fractions ? Math.ceil(translateX / size) : +(translateX / size).toFixed(fractions);
  };

  useEffect(() => {
    translateX.value = rating * size;
  }, [rating, size]);

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

  return { primaryViewStyle, handler };
}
