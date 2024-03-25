import React, { useEffect, useMemo, useRef } from 'react';
import {
  Animated,
  FlatList,
  ListRenderItemInfo,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from 'react-native';

import { Theme, useTheme } from '@td-design/react-native';
import { useMemoizedFn } from '@td-design/rn-hooks';

import { OptionItem, WheelPickerProps } from './type';
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
  const signal = useRef(false);
  const flatListRef = useRef<FlatList>(null);
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

  const handleMomentumScrollBegin = useMemoizedFn(() => {
    signal.current = false;
  });

  const handleMomentumScrollEnd = useMemoizedFn((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (signal.current) return;
    signal.current = true;

    // Due to list bounciness when scrolling to the start or the end of the list
    // the offset might be negative or over the last item.
    // We therefore clamp the offset to the supported range.
    const offsetY = Math.min(itemHeight * (data.length - 1), Math.max(event.nativeEvent.contentOffset.y, 0));
    const _index = Math.ceil(offsetY / itemHeight) + 1;

    const currentItem = data[_index - 1];
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
    flatListRef.current?.scrollToIndex({
      index: selectedIndex,
      animated: false,
    });
  }, [selectedIndex]);

  const renderItem = useMemoizedFn(({ item: option, index }: ListRenderItemInfo<OptionItem>) => {
    return (
      <WheelPickerItem
        index={index}
        option={option}
        style={itemStyle}
        textStyle={itemTextStyle}
        height={itemHeight}
        currentIndex={currentScrollIndex}
        visibleRest={2}
      />
    );
  });

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
        onMomentumScrollBegin={handleMomentumScrollBegin}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        snapToOffsets={offsets}
        decelerationRate={'fast'}
        getItemLayout={(_, index) => ({
          length: itemHeight,
          offset: itemHeight * index,
          index,
        })}
        bounces={false}
        data={paddedOptions}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        maxToRenderPerBatch={3}
        initialNumToRender={2}
      />
    </View>
  );
}
