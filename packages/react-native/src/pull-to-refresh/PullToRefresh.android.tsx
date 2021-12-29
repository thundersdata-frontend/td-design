import { usePrevious, useSafeState, useUpdateEffect } from '@td-design/rn-hooks';
import React, { FC, useRef } from 'react';
import { Animated, LayoutChangeEvent, NativeScrollEvent, NativeSyntheticEvent, ScrollView } from 'react-native';
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
  const [minHeight, setMinHeight] = useSafeState(0);
  const [refreshHeight, setRefreshHeight] = useSafeState(1);
  const [scrollY] = useSafeState(new Animated.Value(0));
  const scrollRef = useRef<ScrollView>(null);
  const layoutScrollHeight = useRef(0);
  const prevRefreshing = usePrevious(refreshing);
  const prevMinHeight = usePrevious(minHeight);

  const onLayout = (event: LayoutChangeEvent) => {
    layoutScrollHeight.current = event.nativeEvent.layout.height;
    setMinHeight(layoutScrollHeight.current + refreshHeight);
  };

  const onScrollEvent = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (refreshHeight === 1 && (event.nativeEvent.velocity?.y ?? 0) < 0) {
      const minHeight = layoutScrollHeight.current + minPullDistance;
      setMinHeight(minHeight);
      setRefreshHeight(minPullDistance);
    }
    onScroll?.(event);
    scrollY.setValue(minPullDistance - event.nativeEvent.contentOffset.y);
    const distance = (scrollY as any)._value;
    if (distance > 5) {
      if (distance === minPullDistance) {
        if (!shouldTriggerRefresh) {
          onTriggerToRefresh?.(true);
          setShouldTriggerRefresh(true);
        } else if (shouldTriggerRefresh) {
          onTriggerToRefresh?.(false);
          setShouldTriggerRefresh(false);
        }
      }
    }
  };

  const onMomentumScrollEnd = () => {
    if (refreshing && (scrollY as any)._value >= 0) {
      scrollRef.current?.scrollTo({ y: refreshHeight, animated: true });
    }
  };

  const onScrollEndDrag = () => {
    if (refreshing) return;
    const distance = (scrollY as any)._value;
    if (distance >= minPullDistance) {
      if (!refreshing && shouldTriggerRefresh) {
        onRefresh();
      }
    } else if (distance > 0) {
      scrollRef.current?.scrollTo({ y: refreshHeight, animated: true });
    }
  };

  const innerScrollTo = (y: number, animated = true) => {
    scrollRef.current?.scrollTo({ y, animated });
  };

  useUpdateEffect(() => {
    if (prevRefreshing !== refreshing) {
      if (!refreshing && !isReachEnd) {
        if ((scrollY as any)._value >= 0) {
          innerScrollTo(refreshHeight);
        }
        scrollY.setValue(0);
      }
    }
    if (prevMinHeight !== minHeight) {
      setTimeout(() => {
        innerScrollTo(refreshHeight, false);
      });
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
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={{ minHeight }}
        scrollEnabled={true}
        onScroll={onScrollEvent}
        onLayout={onLayout}
        onMomentumScrollEnd={onMomentumScrollEnd}
        onScrollEndDrag={onScrollEndDrag}
      >
        <Animated.View
          style={{
            backgroundColor,
            height: refreshHeight,
          }}
        >
          <PullAnimation
            yValues={pullAnimateYValues}
            style={{ height: pullAnimateHeight }}
            scrollY={
              scrollY.interpolate({
                inputRange: [0, minPullDistance],
                outputRange: [0, -minPullDistance],
              }) as any
            }
            refreshing={refreshing}
            minPullDistance={minPullDistance}
          >
            {children}
          </PullAnimation>
        </Animated.View>
        {React.cloneElement(contentComponent, {
          scrollEnabled: false,
        })}
      </ScrollView>
    </Animated.View>
  );
};
