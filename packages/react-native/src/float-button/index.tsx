import React, { ReactNode, useMemo } from 'react';
import { Image, Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Box, Flex, helpers, Text, Theme, useTheme } from '@td-design/react-native';
import { useSafeState } from '@td-design/rn-hooks';

import PlusIcon from './PlusIcon';

interface FloatButtonItem {
  icon?: ReactNode;
  label: ReactNode;
  onPress: () => void | Promise<void>;
  style?: StyleProp<ViewStyle>;
}

export interface FloatButtonProps {
  items: FloatButtonItem[];
  itemHeight?: number;
  position?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
  customActionButton?: (progress: SharedValue<number>, onPress: () => void) => ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  draggable?: boolean;
  actionButtonProps?: {
    width?: number;
    height?: number;
    borderRadius?: number;
  };
}

export default function FloatButton({
  customActionButton,
  items,
  itemHeight = 60,
  position = 'bottomRight',
  containerStyle,
  draggable = false,
  actionButtonProps,
}: FloatButtonProps) {
  const insets = useSafeAreaInsets();
  const theme = useTheme<Theme>();

  const width = useSharedValue(actionButtonProps?.width || itemHeight);
  const height = useSharedValue(actionButtonProps?.height || itemHeight);
  const borderRadius = useSharedValue(actionButtonProps?.borderRadius || itemHeight);

  const isOpen = useSharedValue(false);
  const [opened, setOpened] = useSafeState(false);

  const progress = useDerivedValue(() => (isOpen.value ? withTiming(1) : withTiming(0)));
  const scale = useDerivedValue(() => (isOpen.value ? withTiming(0) : withTiming(1)));

  const handlePress = () => {
    if (!isOpen.value) {
      width.value = withTiming(200);
      height.value = withTiming((items.length + 1) * itemHeight);
      borderRadius.value = withTiming(12);
    } else {
      width.value = withTiming(actionButtonProps?.width || itemHeight);
      height.value = withTiming(actionButtonProps?.height || itemHeight);
      borderRadius.value = withTiming(actionButtonProps?.borderRadius || itemHeight);
    }
    isOpen.value = !isOpen.value;
    setOpened(opened => !opened);
  };

  const iconStyle = {
    width: itemHeight / 2,
    height: itemHeight / 2,
  };

  const positionX = useSharedValue(0);
  const positionY = useSharedValue(0);
  const context = useSharedValue({ x: 0, y: 0 });

  const panGesture = Gesture.Pan()
    .enabled(draggable && !opened)
    .onStart(() => {
      context.value = { x: positionX.value, y: positionY.value };
    })
    .onUpdate(e => {
      positionX.value = e.translationX + context.value.x;
      positionY.value = e.translationY + context.value.y;
    })
    .onEnd(() => {
      'worklet';
      // 滑动结束后，判断位置，自动滑到左边或右边
      // 同时需要根据position，如果一开始位置在左侧，那么滑动结束后，如果超过屏幕一半，自动滑到右边
      // 如果一开始位置在右侧，那么滑动结束后，如果超过屏幕一半，自动滑到左边
      if (position.includes('Left')) {
        if (positionX.value > (helpers.deviceWidth - itemHeight) / 2) {
          // 超过屏幕一半，自动滑到右边
          positionX.value = withTiming(helpers.deviceWidth - itemHeight - 32);
        } else {
          positionX.value = withTiming(0);
        }
      } else {
        if (positionX.value < -(helpers.deviceWidth - itemHeight) / 2) {
          // 超过屏幕一半，自动滑到左边
          positionX.value = withTiming(-helpers.deviceWidth + itemHeight + 32);
        } else {
          positionX.value = withTiming(0);
        }
      }
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: width.value,
      height: height.value,
      borderRadius: borderRadius.value,
      transform: [{ translateX: positionX.value }, { translateY: positionY.value }],
    };
  });

  /** 根据position确定绝对定位的初始位置 */
  const positionStyle = useMemo(() => {
    switch (position) {
      case 'topLeft':
        return { top: 0, left: 0 };
      case 'topRight':
        return { top: 0, right: 0 };
      case 'bottomLeft':
        return { bottom: insets.bottom, left: 0 };
      case 'bottomRight':
        return { bottom: insets.bottom, right: 0 };
      default:
        return { top: 0, left: 0 };
    }
  }, [position]);

  const mainButtonStyle = useAnimatedStyle(() => {
    return {
      opacity: scale.value,
      transform: [{ scale: scale.value }],
    };
  });
  const closeButtonStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      transform: [{ scale: progress.value }],
    };
  });

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View
        style={[
          { backgroundColor: theme.colors.primary200 },
          styles.container,
          positionStyle,
          containerStyle,
          animatedStyle,
        ]}
      >
        {!opened ? (
          <Animated.View style={mainButtonStyle}>
            <Pressable onPress={handlePress}>
              {customActionButton ? (
                customActionButton(progress, handlePress)
              ) : (
                <Animated.View
                  style={[
                    styles.iconContainer,
                    {
                      width: itemHeight,
                      height: itemHeight,
                      borderRadius: itemHeight,
                    },
                  ]}
                >
                  <PlusIcon />
                </Animated.View>
              )}
            </Pressable>
          </Animated.View>
        ) : (
          <Animated.View style={[closeButtonStyle]}>
            <Pressable onPress={handlePress}>
              <Animated.View
                style={[
                  styles.iconContainer,
                  {
                    width: itemHeight,
                    height: itemHeight,
                    transform: [{ rotate: '-45deg' }],
                  },
                ]}
              >
                <PlusIcon />
              </Animated.View>
            </Pressable>
          </Animated.View>
        )}

        <Box>
          {items.map((item, index) => (
            <Pressable
              key={index}
              onPress={async () => {
                await item.onPress();
                handlePress();
              }}
            >
              <Flex alignItems={'center'} height={itemHeight} paddingHorizontal={'x3'} style={item.style}>
                <Box marginRight={'x2'}>
                  {typeof item.icon === 'string' ? <Image source={{ uri: item.icon }} style={iconStyle} /> : item.icon}
                </Box>
                <Box>
                  {typeof item.label === 'string' ? (
                    <Text variant={'p1'} color="white">
                      {item.label}
                    </Text>
                  ) : (
                    item.label
                  )}
                </Box>
              </Flex>
            </Pressable>
          ))}
        </Box>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    overflow: 'hidden',
    margin: 16,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
