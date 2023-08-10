import React, { useEffect, useMemo, useRef } from 'react';
import { Animated, FlatList, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, View } from 'react-native';

import { Theme, useTheme } from '@td-design/react-native';

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
  onChange,
}: WheelPickerProps) {
  const theme = useTheme<Theme>();
  const flatListRef = useRef<FlatList>(null);
  const scrollY = useRef(new Animated.Value(0)).current;

  const containerHeight = 5 * itemHeight;

  const paddedOptions = useMemo(() => {
    const array = [...data];
    for (let i = 0; i < 2; i++) {
      array.unshift(undefined);
      array.push(undefined);
    }
    return array;
  }, [data]);

  let selectedIndex = data.findIndex(item => item?.value === value);
  if (selectedIndex === -1) {
    selectedIndex = 0;
  }

  const offsets = useMemo(
    () => [...Array(paddedOptions.length)].map((_, i) => i * itemHeight),
    [paddedOptions, itemHeight]
  );

  const currentScrollIndex = Animated.add(Animated.divide(scrollY, itemHeight), 2);

  const handleMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    // Due to list bounciness when scrolling to the start or the end of the list
    // the offset might be negative or over the last item.
    // We therefore clamp the offset to the supported range.
    const offsetY = Math.min(itemHeight * (data.length - 1), Math.max(event.nativeEvent.contentOffset.y, 0));
    let index = offsetY / itemHeight + 1;

    const currentItem = data[index - 1];
    if (currentItem) {
      onChange(currentItem.value);
    }
  };

  useEffect(() => {
    flatListRef.current?.scrollToIndex({
      index: selectedIndex,
      animated: false,
    });
  }, [selectedIndex]);

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
      backgroundColor: indicatorBackgroundColor ?? theme.colors.gray100,
    },
    scrollView: {
      overflow: 'hidden',
      flex: 1,
    },
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
        onMomentumScrollEnd={handleMomentumScrollEnd}
        snapToOffsets={offsets}
        decelerationRate={'normal'}
        initialScrollIndex={selectedIndex}
        getItemLayout={(_, index) => ({
          length: itemHeight,
          offset: itemHeight * index,
          index,
        })}
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
      />
    </View>
  );
}
