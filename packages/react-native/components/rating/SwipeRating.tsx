import React, { FC, useEffect, useState } from 'react';
import { Image, ImageSourcePropType, StyleProp, View, ViewStyle, StyleSheet } from 'react-native';
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
import { useImmer } from 'use-immer';

import { SwipeRatingProps } from './type';
import { px } from '../helper';
import Flex from '../flex';

const STAR_IMAGE = require('./images/star.png');
const HEART_IMAGE = require('./images/heart.png');
const ROCKET_IMAGE = require('./images/rocket.png');
const BELL_IMAGE = require('./images/bell.png');

const TYPES = {
  star: {
    source: STAR_IMAGE,
    color: '#f1c40f',
    backgroundColor: 'white',
  },
  heart: {
    source: HEART_IMAGE,
    color: '#e74c3c',
    backgroundColor: 'white',
  },
  rocket: {
    source: ROCKET_IMAGE,
    color: '#2ecc71',
    backgroundColor: 'white',
  },
  bell: {
    source: BELL_IMAGE,
    color: '#f39c12',
    backgroundColor: 'white',
  },
};

const SwipeRating: FC<SwipeRatingProps> = ({
  onFinishRating,
  size = px(40),
  count = 5,
  type = 'star',
  tintColor,
  defaultRating = count / 2,
  minValue = 0,
  fractions,
  customRatingImage = require('./images/star.png'),
  customRatingColor = TYPES.star.color,
  customRatingBackgroundColor = TYPES.star.backgroundColor,
}) => {
  const { gestureHandler, translation, state } = usePanGestureHandler();
  const [types, setTypes] = useImmer<{
    [key: string]: { source: ImageSourcePropType; color: string; backgroundColor: string };
  }>(TYPES);
  const [translateValue, setTranslateValue] = useState(0);
  const translateX = useValue(0);
  const offsetX = useValue(0);

  useEffect(() => {
    if (type === 'custom') {
      const custom = {
        source: customRatingImage,
        color: customRatingColor,
        backgroundColor: customRatingBackgroundColor,
      };
      setTypes(draft => {
        draft.custom = custom;
      });
    }
  }, [customRatingBackgroundColor, customRatingColor, customRatingImage, setTypes, type]);

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
      backgroundColor: types[type].color,
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
      backgroundColor: types[type].backgroundColor,
      width,
      height: width ? size : 0,
    };
  };

  const renderRatings = () => {
    const source = types[type].source;
    return Array(count)
      .fill('')
      .map((_, index) => <Image key={index} source={source} style={{ width: size, height: size, tintColor }} />);
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
