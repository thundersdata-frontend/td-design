import React, { FC, ReactElement } from 'react';
import { Animated, UIManager } from 'react-native';

import type { PullAnimationProps } from './type';

UIManager.setLayoutAnimationEnabledExperimental?.(true);
export const PullAnimation: FC<PullAnimationProps> = ({
  style,
  refreshing,
  minPullDistance,
  scrollY,
  yValues,
  children,
}) => {
  return (
    <Animated.View
      style={[
        style,
        {
          position: 'absolute',
          top: scrollY.interpolate({
            inputRange: [-minPullDistance, 0],
            outputRange: [yValues.to || yValues.to === 0 ? yValues.to! : yValues.from!, yValues.from!],
            extrapolate: 'clamp',
          }),
        },
      ]}
    >
      {React.Children.map(children, child => {
        return React.cloneElement(child as ReactElement, {
          refreshing,
          scrollY,
          minPullDistance,
        });
      })}
    </Animated.View>
  );
};
