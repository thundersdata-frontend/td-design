import React, { useState, ReactNode, useEffect, useRef } from 'react';
import {
  Animated,
  FlatListProps,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollViewProps,
  StyleSheet,
  View,
} from 'react-native';
import { px } from '../helper';

export interface PullRefreshProps<T>
  extends Partial<Animated.AnimatedProps<ScrollViewProps>>,
    Partial<Animated.AnimatedProps<FlatListProps<T>>> {
  /** 滚动组件类型。目前支持ScrollView和FlatList */
  scrollComponent?: 'ScrollView' | 'FlatList';
  /** 传入的自定义刷新组件 */
  refreshComponent: ReactNode;
  /** 触发刷新的高度 */
  refreshTriggerHeight?: number;
  /** 滚动过程拿到滚动百分比 */
  onProgress?: (progress: number) => void;
  /** 手势释放之后触发的刷新方法 */
  onRefresh: () => Promise<any>;
  /** 子组件 */
  children?: ReactNode;
}

function PullRefresh<T>({
  scrollComponent = 'ScrollView',
  refreshComponent,
  refreshTriggerHeight = px(60),
  onProgress,
  onRefresh,
  style,
  children,
  ...restProps
}: PullRefreshProps<T>) {
  const [scrollY, setScrollY] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (scrollY < 0 && !refreshing) {
      const progress = -scrollY / refreshTriggerHeight;
      onProgress?.(progress >= 1 ? 1 : progress);
    }
  }, [scrollY, refreshing, refreshTriggerHeight, onProgress]);

  useEffect(() => {
    if (refreshing) {
      Animated.timing(translateY, {
        toValue: refreshTriggerHeight,
        duration: 0,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [translateY, refreshTriggerHeight, refreshing]);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { y } = e.nativeEvent.contentOffset;
    setScrollY(y);
  };

  const handleRelease = async () => {
    if (scrollY <= -refreshTriggerHeight && !refreshing) {
      setRefreshing(true);
      await onRefresh();
      setRefreshing(false);
    }
  };

  if (scrollComponent === 'ScrollView') {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.scrollHeader}>{refreshComponent}</View>
        <Animated.ScrollView
          onScroll={handleScroll}
          scrollEventThrottle={16}
          horizontal={false}
          onResponderRelease={handleRelease}
          style={[styles.scrollView, style, { transform: [{ translateY }] }]}
          {...restProps}
        >
          {children}
        </Animated.ScrollView>
      </View>
    );
  }
  const AnimatedFlatList = Animated.FlatList as any;
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.scrollHeader}>{refreshComponent}</View>
      <AnimatedFlatList
        onScroll={handleScroll}
        scrollEventThrottle={16}
        horizontal={false}
        onResponderRelease={handleRelease}
        style={[styles.scrollView, style, { transform: [{ translateY }] }]}
        {...restProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  scrollHeader: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
});

export default PullRefresh;
