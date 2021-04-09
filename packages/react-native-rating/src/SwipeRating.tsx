import React, { FC, useEffect, useState } from 'react';
import { StyleProp, View, ViewStyle, StyleSheet } from 'react-native';
import Animated, {
  add,
  call,
  cond,
  eq,
  Extrapolate,
  interpolate,
  set,
  useCode,
  useValue,
} from 'react-native-reanimated';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { usePanGestureHandler } from 'react-native-redash';
import { SwipeRatingProps } from './type';
import SwipeStar from './components/SwipeStar';
import { helpers, useTheme, Theme, Flex } from '@td-design/react-native';

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
  const { gestureHandler, translation, state } = usePanGestureHandler();

  const [translateValue, setTranslateValue] = useState(0);
  const translateX = useValue(0);
  const offsetX = useValue(0);

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
      setTranslateValue(value);
    };

    setCurrentRating(defaultRating);
  }, [count, defaultRating, size]);

  useCode(() => [set(offsetX, translateValue), set(translateX, translateValue)], [translateValue]);

  useCode(
    () => [
      cond(eq(state, State.ACTIVE), [set(translateX, add(offsetX, translation.x))]),
      cond(eq(state, State.END), [
        set(offsetX, translateX),
        call([translateX], ([translateX]) => {
          const currentRating = getCurrentRating(translateX);
          onFinishRating?.(currentRating);
        }),
      ]),
    ],
    [translation]
  );

  const getPrimaryViewStyle: () => StyleProp<Animated.AnimateStyle<ViewStyle>> = () => {
    const width = interpolate(translateX, {
      inputRange: [-count * (size / 2), 0, count * (size / 2)],
      outputRange: [0, (count * size) / 2, count * size],
      extrapolate: Extrapolate.CLAMP,
    });

    return {
      backgroundColor: ratingFillColor,
      width,
      height: width ? size : 0,
    };
  };

  const getSecondaryViewStyle: () => StyleProp<Animated.AnimateStyle<ViewStyle>> = () => {
    const width = interpolate(translateX, {
      inputRange: [-count * (size / 2), 0, count * (size / 2)],
      outputRange: [count * size, (count * size) / 2, 0],
      extrapolate: Extrapolate.CLAMP,
    });

    return {
      backgroundColor: ratingBgColor,
      width,
      height: width ? size : 0,
    };
  };

  const renderRatings = () => {
    return Array(count)
      .fill('')
      .map((_, index) => (
        <SwipeStar key={index} width={size} height={size} bgColor={ratingBgColor} strokeColor={strokeColor} />
      ));
  };

  return (
    <PanGestureHandler {...gestureHandler}>
      <Animated.View style={styles.startsWrapper}>
        <View style={styles.starsInsideWrapper}>
          <Animated.View style={[getPrimaryViewStyle()]} />
          <Animated.View style={getSecondaryViewStyle()} />
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
