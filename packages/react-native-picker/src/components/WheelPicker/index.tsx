import React, { useEffect, useMemo, useRef } from 'react';
import { Animated, FlatList, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, View } from 'react-native';

import { Theme, useTheme } from '@td-design/react-native';
import { useMemoizedFn } from '@td-design/rn-hooks';

import { WheelPickerProps } from './type';
import WheelPickerItem from './WheelPickerItem';

export default function WheelPicker({
  data,
  value,
  indicatorBackgroundColor,
  containerStyle,
  itemStyle,
  itemTextStyle,
  itemHeight = 40,
  index,
  onChange,
}: WheelPickerProps) {
  const theme = useTheme<Theme>();
  const flatListRef = useRef<FlatList>(null);
  const flag = useRef(false);

  const scrollY = useRef(new Animated.Value(0)).current;

  const containerHeight = 5 * itemHeight;

  const { paddedOptions, offsets } = useMemo(() => {
    const array = [...data];
    for (let i = 0; i < 2; i++) {
      array.unshift(undefined);
      array.push(undefined);
    }
    return {
      paddedOptions: array,
      offsets: array.map((_, i) => i * itemHeight),
    };
  }, [data, itemHeight]);

  let selectedIndex = data.findIndex(item => item?.value === value);
  if (selectedIndex === -1) {
    selectedIndex = 0;
  }

  const currentScrollIndex = Animated.add(Animated.divide(scrollY, itemHeight), 2);

  /**
   * 惯性滚动结束时触发
   */
  const handleMomentumScrollEnd = useMemoizedFn((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    handleScrollEnd(event.nativeEvent.contentOffset.y);
    flag.current = false;
  });

  /**
   * 拖动结束时触发，实测下来， handleDragEnd 一定会触发，但是 handleMomentumScrollEnd 不一定会触发
   * 所以使用 setTimeout 来延迟执行 handleScrollEnd，确保在 handleMomentumScrollEnd 之后执行
   */
  const handleDragEnd = useMemoizedFn((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    event.persist();

    setTimeout(() => {
      if (!flag.current) {
        handleScrollEnd(event.nativeEvent.contentOffset.y);
      }
    }, 10);
  });

  const handleScrollEnd = useMemoizedFn((y: number) => {
    // Due to list bounciness when scrolling to the start or the end of the list
    // the offset might be negative or over the last item.
    // We therefore clamp the offset to the supported range.
    const offsetY = Math.min(itemHeight * (data.length - 1), Math.max(y, 0));

    let _index = Math.floor(Math.floor(offsetY) / itemHeight);
    const last = Math.floor(offsetY % itemHeight);
    if (last > itemHeight / 2) {
      _index += 1;
    }

    const currentItem = data[_index];
    if (currentItem) {
      onChange(currentItem.value, index);
    }
  });

  const styles = StyleSheet.create({
    container: {
      position: 'relative',
      flex: 1,
      height: containerHeight,
    },
    selectedIndicator: {
      position: 'absolute',
      width: '100%',
      top: '50%',
      transform: [{ translateY: -itemHeight / 2 }],
      height: itemHeight,
      backgroundColor: indicatorBackgroundColor ?? theme.colors.gray50,
    },
    scrollView: {
      overflow: 'hidden',
      flex: 1,
    },
  });

  useEffect(() => {
    setTimeout(() => {
      flatListRef.current?.scrollToIndex({
        index: selectedIndex,
        animated: false,
      });
    }, 100);
  }, [selectedIndex]);

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.selectedIndicator} />
      <Animated.FlatList
        ref={flatListRef}
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        centerContent
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
        onMomentumScrollBegin={() => {
          flag.current = true;
        }}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        onScrollEndDrag={handleDragEnd}
        snapToOffsets={offsets}
        decelerationRate={'normal'}
        disableIntervalMomentum
        initialScrollIndex={selectedIndex}
        getItemLayout={(_, index) => ({
          length: itemHeight,
          offset: itemHeight * index,
          index,
        })}
        bounces={false}
        data={paddedOptions}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item: option, index }) => (
          <WheelPickerItem
            index={index}
            option={option}
            style={itemStyle}
            textStyle={itemTextStyle}
            height={itemHeight}
            currentIndex={currentScrollIndex}
            visibleRest={2}
          />
        )}
        maxToRenderPerBatch={3}
        initialNumToRender={2}
      />
    </View>
  );
}
