import React, { useEffect, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  runOnJS,
  SharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { CascadePickerItemProps, WheelPickerProps } from './type';

export default function WheelPicker<T>({
  itemHeight = 40,
  data,
  visibleRest = 5,
  textStyle,
  contentContainerStyle,
  indicatorBgColor = 'rgba(0, 0, 0, 0.3)',
  value,
  onChange,
  ...props
}: WheelPickerProps<T>) {
  const translateY = useSharedValue(0);

  const initialIndex = useMemo(() => (value ? data.findIndex(item => item.value === value) : 0), [value, data]);

  useEffect(() => {
    translateY.value = -itemHeight * initialIndex;
  }, [itemHeight, initialIndex]);

  const snapPoints = new Array(data.length).fill(0).map((_, index) => -itemHeight * index);

  const timingConfig = {
    duration: 1000,
    easing: Easing.bezier(0.35, 1, 0.35, 1),
  };

  const wrapper = (index: number) => {
    onChange?.(data[index], index);
  };

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any) {
      ctx.y = translateY.value;
    },
    onActive(event, ctx) {
      translateY.value = ctx.y + event.translationY;
    },
    onEnd(event) {
      const snapPointsY = snapPoint(translateY.value, event.velocityY, snapPoints);
      const index = Math.abs(snapPointsY / itemHeight);
      translateY.value = withTiming(snapPointsY, timingConfig);
      runOnJS(wrapper)(index);
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <View {...props} style={styles.container}>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
          style={[
            animatedStyle,
            contentContainerStyle,
            {
              height: itemHeight * visibleRest,
              paddingTop: (itemHeight * visibleRest - itemHeight) / 2,
            },
          ]}
        >
          {data.map((data, index) => (
            <PickerItem
              key={index}
              translateY={translateY}
              index={index}
              itemHeight={itemHeight}
              visibleRest={visibleRest}
              data={data}
              textStyle={textStyle}
            />
          ))}
        </Animated.View>
      </PanGestureHandler>
      <View
        style={{
          width: '100%',
          height: itemHeight,
          backgroundColor: indicatorBgColor,
          opacity: 0.2,
          position: 'absolute',
        }}
        pointerEvents="none"
      />
    </View>
  );
}

function PickerItem<T>({
  translateY,
  index,
  data,
  itemHeight,
  visibleRest,
  textStyle,
}: {
  translateY: SharedValue<number>;
  index: number;
  data: CascadePickerItemProps<T>;
} & Required<Pick<WheelPickerProps<T>, 'itemHeight' | 'visibleRest'>> &
  Pick<WheelPickerProps<T>, 'textStyle'>) {
  const y = useDerivedValue(() =>
    interpolate(
      translateY.value / -itemHeight,
      [index - visibleRest / 2, index, index + visibleRest / 2],
      [-1, 0, 1],
      Extrapolate.CLAMP
    )
  );

  const textAnimation = useAnimatedStyle(() => ({
    opacity: 1 / (1 + Math.abs(y.value)),
    transform: [
      {
        scale: 1 - Math.abs(y.value) * 0.35,
      },
      {
        perspective: 500,
      },
      {
        rotateX: `${y.value * 65}deg`,
      },
    ],
  }));

  return (
    <Animated.View style={[styles.item, { height: itemHeight }]}>
      <Animated.Text style={[textAnimation, textStyle]}>{data.label}</Animated.Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
    justifyContent: 'center',
    position: 'relative',
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

/**
 * @summary Select a point where the animation should snap to given the value of the gesture and it's velocity.
 * @worklet
 */
const snapPoint = (value: number, velocity: number, points: ReadonlyArray<number>): number => {
  'worklet';
  const point = value + 0.2 * velocity;
  const deltas = points.map(p => Math.abs(point - p));
  const minDelta = Math.min.apply(null, deltas);
  return points.find(p => Math.abs(point - p) === minDelta) || points[0];
};
