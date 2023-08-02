import React, { FC, PropsWithChildren } from 'react';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { mix } from 'react-native-redash';

const Chevron: FC<
  PropsWithChildren<{
    progress: Animated.SharedValue<number>;
  }>
> = ({ progress, children }) => {
  const style = useAnimatedStyle(() => ({
    transform: [{ rotateZ: `${mix(progress.value, 0, Math.PI)}rad` }],
  }));

  if (!children) return null;

  return <Animated.View style={style}>{children}</Animated.View>;
};

export default Chevron;
