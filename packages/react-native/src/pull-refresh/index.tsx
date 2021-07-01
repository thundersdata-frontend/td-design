import React, { useCallback, useEffect, useRef, useState } from 'react';
import { NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { NativeViewGestureHandler, PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { DefaultHeader } from './DefaultHeader';
import { PullRefreshHeaderRef, PullRefreshProps } from './type';

function PullRefresh({
  refreshing = false,
  onRefresh,
  headerHeight = 60,
  HeaderComponent = DefaultHeader,
  children,
  headerStyle,
}: PullRefreshProps) {
  const [gestureEnabled, setGestureEnabled] = useState(!refreshing);

  const header = useRef<PullRefreshHeaderRef>(null);
  const wrapper = useRef<PanGestureHandler>();
  const scroll = useRef<NativeViewGestureHandler>();

  const translateY = useSharedValue(0);

  const setProgress = useCallback(
    (value: number) => {
      header.current?.setProgress({
        pullDistance: value,
        percent: value / headerHeight > 1 ? 1 : value / headerHeight,
      });
    },
    [headerHeight]
  );

  useEffect(() => {
    setGestureEnabled(!refreshing);
    if (!refreshing) {
      translateY.value = withTiming(0);
      runOnJS(setProgress)(0);
    }
  }, [refreshing, setProgress, translateY]);

  const panHandler = useAnimatedGestureHandler({
    onActive(event) {
      if (!gestureEnabled) return;

      if (event.translationY > 0) {
        translateY.value = event.translationY;
        runOnJS(setProgress)(event.translationY);
      } else {
        translateY.value = withTiming(0);
      }
    },
    onEnd() {
      if (translateY.value > headerHeight) {
        translateY.value = withSpring(headerHeight);
        runOnJS(onRefresh)();
      } else {
        translateY.value = withSpring(0);
        runOnJS(setProgress)(0);
      }
    },
  });

  /** 滚动过程中禁用PanGestureHandler */
  const handleScrolling = () => {
    setGestureEnabled(false);
  };

  /** 滚动结束之后根据位置判断是否禁用PanGestureHandler */
  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { y } = event.nativeEvent.contentOffset;

    if (y > 0) {
      // 表示内容没有滚动到顶部
      setGestureEnabled(false);
    } else {
      setGestureEnabled(true);
    }
  };

  const wrapperStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: translateY.value,
      },
    ],
  }));

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

  const child = React.cloneElement(children, {
    bounces: false,
    onScroll: handleScrolling,
    onMomentumScrollEnd: handleScrollEnd,
    scrollEventThrottle: 1,
  });
  return (
    <PanGestureHandler
      ref={wrapper}
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
