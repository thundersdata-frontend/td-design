import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Text, Animated, ViewStyle, TextStyle } from 'react-native';
import { PullToRefreshHeaderProps } from '@td-design/react-native';

const headerStyle = {
  con: {
    height: 100,
    justifyContent: 'center',
    backgroundColor: 'yellow',
  } as ViewStyle,
  title: {
    fontSize: 22,
  } as TextStyle,
};

const Header = forwardRef<
  {
    setProgress: (values: { pullDistance: number; percent: number }) => void;
  },
  PullToRefreshHeaderProps
>(({ pullDistance: pullDistanceProp, percent, percentAnimatedValue, refreshing }, ref) => {
  const [pullDistance, setPullDistance] = useState(0);
  const [statePercent, setPercent] = useState(0);

  useEffect(() => {
    setPullDistance(pullDistanceProp);
    setPercent(percent);
  }, [pullDistanceProp, percent]);

  useImperativeHandle(ref, () => {
    return {
      setProgress,
    };
  });

  /** 必须要暴露出去 */
  const setProgress = ({ pullDistance, percent }: { pullDistance: number; percent: number }) => {
    setPullDistance(pullDistance);
    setPercent(percent);
  };

  let text = 'pull to refresh ';
  if (statePercent >= 1) {
    if (refreshing) {
      text = 'refreshing...';
    } else {
      text = 'release to refresh  ';
    }
  }
  text += pullDistance.toFixed(2);

  return (
    <Animated.View
      style={[
        headerStyle.con,
        {
          opacity: percentAnimatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolate: 'clamp',
          }) as any,
        },
      ]}
    >
      <Text style={headerStyle.title}>{text}</Text>
    </Animated.View>
  );
});

export default Header;
