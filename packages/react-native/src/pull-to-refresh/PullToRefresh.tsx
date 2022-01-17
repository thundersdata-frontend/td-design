import { useSafeState, useUpdateEffect } from '@td-design/rn-hooks';
import React, { FC, ReactElement, useRef } from 'react';
import { FlatList, NativeScrollEvent, NativeSyntheticEvent, ScrollView } from 'react-native';
import {
  NativeViewGestureHandler,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { DefaultHeader } from './DefaultHeader';

import { PullToRefreshProps, PullToRefreshHeaderRef } from './type';

const defaultSpringConfig = {
  damping: 20,
  mass: 1,
  stiffness: 160,
  overshootClamping: false,
  restDisplacementThreshold: 0.01,
  restSpeedThreshold: 0.01,
};

const PullToRefresh: FC<PullToRefreshProps> = ({
  refreshing = false,
  onRefresh,
  headerHeight = 80,
  HeaderComponent = DefaultHeader,
  children,
  renderChildren,
  springConfig = defaultSpringConfig,
}) => {
  const pan = useRef<PanGestureHandler>(null);
  const scroll = useRef<NativeViewGestureHandler>();
  const scrollRef = useRef<ScrollView | FlatList>(null);
  const headerRef = useRef<PullToRefreshHeaderRef>(null);
  const [gestureEnabled, setGestureEnabled] = useSafeState(!refreshing);

  const translateY = useSharedValue(0);
  const progress = useDerivedValue(() => Math.min(translateY.value / headerHeight, 1));

  const setProgress = (value: number) => {
    headerRef.current?.setProgress(value);
  };

  const gestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onStart() {
      if (!gestureEnabled) return false;
      return true;
    },
    onActive(event) {
      if (event.translationY > 0) {
        translateY.value = event.translationY;
        runOnJS(setProgress)(progress.value);
      } else {
        translateY.value = withTiming(0);
      }
    },
    onEnd() {
      if (translateY.value > headerHeight) {
        translateY.value = withSpring(headerHeight, springConfig);
        runOnJS(onRefresh)();
      } else {
        translateY.value = withSpring(0, springConfig);
        runOnJS(setProgress)(progress.value);
      }
    },
  });

  const onScroll = () => {
    setGestureEnabled(false);
  };

  const onMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY > 0) {
      setGestureEnabled(false);
    } else {
      setGestureEnabled(true);
    }
  };

  useUpdateEffect(() => {
    if (!refreshing) {
      translateY.value = withTiming(0);
      setProgress(progress.value);
    } else {
      translateY.value = withSpring(headerHeight, springConfig);
      if (scrollRef.current) {
        if ('scrollTo' in scrollRef.current) {
          scrollRef.current?.scrollTo({ x: 0, y: 0, animated: true });
        } else if ('scrollToOffset' in scrollRef.current) {
          scrollRef.current?.scrollToOffset({ offset: 0, animated: true });
        }
      }
    }
    setGestureEnabled(!refreshing);
  }, [refreshing]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      flex: 1,
      transform: [{ translateY: translateY.value }],
    };
  });

  let finalChildren = null;
  if (children) {
    finalChildren = React.cloneElement(children as ReactElement, {
      ref: scrollRef,
      bounces: false,
      scrollEnabled: !refreshing,
      scrollEventThrottle: 16,
      onScroll,
      onMomentumScrollEnd,
    });
  }
  if (renderChildren) {
    const _children = renderChildren({ onScroll, onMomentumScrollEnd, scrollEnabled: !refreshing });
    finalChildren = React.cloneElement(_children, {
      ref: scrollRef,
    });
  }

  return (
    <Animated.View style={{ position: 'relative', flex: 1 }}>
      <PanGestureHandler
        ref={pan}
        enabled={gestureEnabled}
        simultaneousHandlers={scroll}
        shouldCancelWhenOutside={false}
        enableTrackpadTwoFingerGesture
        onGestureEvent={gestureEvent}
      >
        <Animated.View style={[animatedStyle]}>
          <Animated.View
            style={[{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1, height: headerHeight }]}
          >
            <HeaderComponent ref={headerRef} {...{ headerHeight, refreshing }} />
          </Animated.View>
          <Animated.View style={{ flex: 1, zIndex: 99 }}>
            <NativeViewGestureHandler ref={scroll} shouldActivateOnStart>
              {finalChildren}
            </NativeViewGestureHandler>
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

export default PullToRefresh;
