import React, { FC, PropsWithChildren } from 'react';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { StyleSheet } from 'react-native';
import { mix } from 'react-native-redash';

const Chevron: FC<
  PropsWithChildren<{
    progress: Animated.SharedValue<number>;
  }>
> = ({ progress, children }) => {
  const style = useAnimatedStyle(() => ({
    transform: [{ rotateZ: `${mix(progress.value, 0, Math.PI)}rad` }],
  }));

  return <Animated.View style={[styles.container, style]}>{children}</Animated.View>;
};

export default Chevron;

const size = 30;
const styles = StyleSheet.create({
  container: {
    height: size,
    width: size,
    borderRadius: size / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
