import React from 'react';
import { NativeViewGestureHandler, PanGestureHandler } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

import { DefaultHeader } from './DefaultHeader';
import { PullRefreshProps } from './type';
import usePullRefresh from './usePullRefresh';

const defaultSpringConfig = {
  damping: 20,
  mass: 1,
  stiffness: 160,
  overshootClamping: false,
  restDisplacementThreshold: 0.01,
  restSpeedThreshold: 0.01,
};

function PullRefresh({
  refreshing = false,
  onRefresh,
  headerHeight,
  HeaderComponent = DefaultHeader,
  children,
  headerStyle,
  springConfig = defaultSpringConfig,
  onScrollY,
}: PullRefreshProps) {
  const { scroll, header, panHandler, wrapperStyle, gestureEnabled, child } = usePullRefresh({
    refreshing,
    onRefresh,
    springConfig,
    onScrollY,
    children,
  });

  const renderHeader = () => {
    const Header = HeaderComponent;

    return (
      <Animated.View
        style={[
          {
            position: 'absolute',
            width: '100%',
            left: 0,
            top: 0,
            zIndex: 1,
          },
        ]}
      >
        <Header ref={header} {...{ headerHeight, refreshing, headerStyle }} />
      </Animated.View>
    );
  };

  return (
    <PanGestureHandler
      maxPointers={1}
      enabled={gestureEnabled}
      simultaneousHandlers={scroll}
      shouldCancelWhenOutside={false}
      onGestureEvent={panHandler}
    >
      <Animated.View style={[{ flex: 1 }, wrapperStyle]}>
        {renderHeader()}
        <Animated.View style={[{ flex: 1, zIndex: 99 }]}>
          <NativeViewGestureHandler ref={scroll} shouldActivateOnStart>
            {child}
          </NativeViewGestureHandler>
        </Animated.View>
      </Animated.View>
    </PanGestureHandler>
  );
}

export default PullRefresh;
