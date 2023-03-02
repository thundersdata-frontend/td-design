import React, { useEffect, useMemo, useRef } from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { runOnJS } from 'react-native-reanimated';
import { snapPoint } from 'react-native-redash';

import { useTheme } from '@shopify/restyle';
import { helpers, Theme } from '@td-design/react-native';
import { useMemoizedFn } from '@td-design/rn-hooks';

import { OptionItem, WheelPickerProps } from './type';
import WheelPickerItem from './WheelPickerItem';

const { px } = helpers;
export default function WheelPicker({
  data,
  value,
  indicatorBackgroundColor,
  containerStyle,
  itemStyle,
  itemTextStyle,
  itemHeight = px(40),
  onChange,
}: WheelPickerProps) {
  const theme = useTheme<Theme>();
  const flatListRef = useRef<Animated.FlatList<OptionItem | null>>(null);
  const scrollY = useSharedValue(0);
  const containerHeight = 5 * itemHeight;

  // 往顶部和尾部插入两个空节点
  const { paddedOptions, snapPoints } = useMemo(() => {
    const newOptions: (OptionItem | null)[] = [...data];
    for (let i = 0; i < 2; i++) {
      newOptions.unshift(null);
      newOptions.push(null);
    }
    const snapPoints = [...Array(newOptions.length)].map((_, i) => i * itemHeight);

    return { paddedOptions: newOptions, snapPoints };
  }, [data]);

  const currentIndex = useMemo(() => {
    const index = paddedOptions.findIndex(item => item?.value === value);
    if (index > -1) {
      return index - 2;
    }
    return 0;
  }, [paddedOptions, value]);

  useEffect(() => {
    const instance = flatListRef.current?.getNode ? flatListRef.current?.getNode() : flatListRef.current;
    (instance as FlatList)?.scrollToIndex({
      index: currentIndex,
      animated: true,
    });
  }, [currentIndex]);

  const handleScroll = useAnimatedScrollHandler({
    onScroll: event => {
      scrollY.value = event.contentOffset.y;
    },
    onMomentumEnd(event) {
      const snapPointY = snapPoint(scrollY.value, event.velocity?.y ?? 0, snapPoints);
      const index = Math.abs(snapPointY / itemHeight);
      const selectedItem = data[index];

      if (selectedItem && index !== currentIndex) {
        runOnJS(onChange)(selectedItem.value);
      }
    },
  });

  const renderPickerItem = useMemoizedFn(({ item, index }: ListRenderItemInfo<OptionItem | null>) => {
    return (
      <WheelPickerItem
        index={index}
        option={item}
        style={itemStyle}
        textStyle={itemTextStyle}
        currentIndex={currentIndex}
        height={itemHeight}
      />
    );
  });

  return (
    <View style={[styles.container, containerStyle, { height: containerHeight }]}>
      <View
        style={[
          styles.selectedIndicator,
          {
            transform: [{ translateY: -itemHeight / 2 }],
            height: itemHeight,
            backgroundColor: indicatorBackgroundColor ?? theme.colors.gray100,
          },
        ]}
      />
      <Animated.FlatList
        ref={flatListRef}
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        snapToOffsets={snapPoints}
        decelerationRate="fast"
        initialScrollIndex={currentIndex}
        getItemLayout={(_, index) => ({
          length: itemHeight,
          offset: itemHeight * index,
          index,
        })}
        data={paddedOptions}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderPickerItem}
        scrollEventThrottle={16}
        onScroll={handleScroll}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
  },
  selectedIndicator: {
    position: 'absolute',
    width: '100%',
    top: '50%',
  },
  scrollView: {
    overflow: 'hidden',
    flex: 1,
  },
});
