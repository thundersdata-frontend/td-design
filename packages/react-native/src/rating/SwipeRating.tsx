import React, { FC, useEffect, useState } from 'react';
import { Image, StyleProp, View, ViewStyle, StyleSheet } from 'react-native';
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
import { px } from '../helper';
import Flex from '../flex';

const STAR_IMAGE =
  'data:image/png;base64,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';

const SwipeRating: FC<SwipeRatingProps> = ({
  onFinishRating,
  size = px(40),
  count = 5,
  tintColor,
  defaultRating = count / 2,
  minValue = 0,
  fractions = 2,
  ratingImage = { uri: STAR_IMAGE },
  ratingColor = 'gold',
  ratingBgColor = '#fff',
}) => {
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
      backgroundColor: ratingColor,
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
      .map((_, index) => <Image key={index} source={ratingImage} style={{ width: size, height: size, tintColor }} />);
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
