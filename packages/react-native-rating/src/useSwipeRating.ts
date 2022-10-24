import { useEffect } from 'react';
import { Gesture } from 'react-native-gesture-handler';
import { runOnJS, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

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
  const startPosition = useSharedValue(0);

  const getCurrentRating = (translateX: number) => {
    'worklet';
    return !fractions ? Math.ceil(translateX / size) : +(translateX / size).toFixed(fractions);
  };

  useEffect(() => {
    translateX.value = rating * size;
  }, [rating, size, translateX]);

  const gesture = Gesture.Pan()
    .onStart(() => {
      startPosition.value = translateX.value;
    })
    .onUpdate(e => {
      const value = e.translationX + startPosition.value;
      translateX.value = value >= count * size ? count * size : value;
    })
    .onEnd(() => {
      const currentRating = getCurrentRating(translateX.value);
      onFinishRating && runOnJS(onFinishRating)(currentRating);
    });

  const primaryViewStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: ratingFillColor,
      width: translateX.value,
      height: size - 1,
    };
  });

  return { primaryViewStyle, gesture };
}
