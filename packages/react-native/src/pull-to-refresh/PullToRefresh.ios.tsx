import { useSafeState, useUpdateEffect } from '@td-design/rn-hooks';
import React, { FC } from 'react';
import { useRef } from 'react';
import { Animated, NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleSheet } from 'react-native';
import { PullAnimation } from './PullAnimation';

import type { PullToRefreshProps } from './type';

export const PullToRefresh: FC<PullToRefreshProps> = ({
  children,
  backgroundColor = '#f6f6f6',
  minPullDistance = 120,
  pullAnimateYValues,
  pullAnimateHeight,
  refreshing,
  onRefresh,
  onScroll,
  onTriggerToRefresh,
  contentComponent,
  isReachEnd,
}) => {
  const [shouldTriggerRefresh, setShouldTriggerRefresh] = useSafeState(false);
  const [isScrollFree, setIsScrollFree] = useSafeState(true);
  const scrollY = useRef(new Animated.Value(0));
  const scrollRef = useRef<ScrollView>(null);

  const onResponderRelease = () => {
    if (!refreshing && shouldTriggerRefresh) {
      scrollRef.current?.scrollTo({ y: -minPullDistance, animated: true });
      setIsScrollFree(false);
      onRefresh();
    }
  };

  const onScrollEvent = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    onScroll?.(event);
    scrollY.current.setValue(event.nativeEvent.contentOffset.y);
    if (!isScrollFree) return;

    if (event.nativeEvent.contentOffset.y <= -minPullDistance) {
      onTriggerToRefresh?.(true);
      setShouldTriggerRefresh(true);
    } else if (shouldTriggerRefresh) {
      onTriggerToRefresh?.(false);
      setShouldTriggerRefresh(false);
    }
  };

  const innerScrollTo = (y: number) => {
    scrollRef.current?.scrollTo({ y, animated: true });
  };

  useUpdateEffect(() => {
    if (!refreshing) {
      if (!isReachEnd) {
        innerScrollTo(0);
      }
      setIsScrollFree(true);
    }
  }, [refreshing, isReachEnd]);

  return (
    <Animated.View
      style={{
        flex: 1,
        zIndex: -100,
        backgroundColor,
      }}
    >
      <Animated.View
        style={{
          backgroundColor,
          height: scrollY.current.interpolate({
            inputRange: [-minPullDistance, 0],
            outputRange: [minPullDistance, 0],
          }),
        }}
      >
        <PullAnimation
          yValues={pullAnimateYValues}
          style={{ height: pullAnimateHeight }}
          scrollY={scrollY.current}
          refreshing={refreshing}
          minPullDistance={minPullDistance}
        >
          {children}
        </PullAnimation>
      </Animated.View>
      <Animated.View
        style={[
          StyleSheet.absoluteFillObject,
          {
            backgroundColor: 'transparent',
          },
        ]}
      >
        {React.cloneElement(contentComponent, {
          scrollEnabled: isScrollFree,
          scrollEventThrottle: 16,
          onScroll: onScrollEvent,
          onResponderRelease,
          ref: scrollRef,
          scrollToOverflowEnabled: true,
        })}
      </Animated.View>
    </Animated.View>
  );
};
