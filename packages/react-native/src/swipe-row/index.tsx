import React, { FC } from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated, { add, cond, eq, interpolate, set, useCode, useValue } from 'react-native-reanimated';
import { snapPoint, timing, usePanGestureHandler } from 'react-native-redash';

import { deviceWidth, px } from '../helper';

export interface SwipeAction {
  /** 操作项文本 */
  label: string;
  /** 操作项文本样式 */
  textStyle?: StyleProp<TextStyle>;
  /** 操作项点击事件 */
  onPress: () => void;
  /** 背景色 */
  backgroundColor: string;
  /** 操作项容器样式 */
  containerStyle?: StyleProp<Animated.AnimateStyle<ViewStyle>>;
}

export interface SwipeRowProps {
  /** 左侧滑出的操作项 */
  leftActions?: SwipeAction[];
  /** 右侧滑出的操作项 */
  rightActions?: SwipeAction[];
  /** 行高 */
  height?: number;
  /** 每个操作项的宽度 */
  snapPointWidth?: number;
}

const SwipeRow: FC<SwipeRowProps> = ({
  leftActions = [],
  rightActions = [],
  height = px(60),
  snapPointWidth = height,
  children,
}) => {
  const snapPoints = [leftActions.length * snapPointWidth, 0, -rightActions.length * snapPointWidth];
  const { gestureHandler, translation, velocity, state } = usePanGestureHandler();
  const translateX = useValue(0);
  const offsetX = useValue(0);
  const to = snapPoint(translateX, velocity.x, snapPoints);

  useCode(
    () => [
      cond(eq(state, State.ACTIVE), [set(translateX, add(offsetX, translation.x))]),
      cond(eq(state, State.END), [set(translateX, timing({ from: translateX, to })), set(offsetX, translateX)]),
    ],
    []
  );

  const styles = StyleSheet.create({
    line: {
      position: 'absolute',
      left: 0,
      right: 0,
      height,
    },
    action: {
      position: 'absolute',
      top: 0,
      width: deviceWidth,
    },
  });

  return (
    <View style={{ backgroundColor: 'gold' }}>
      {leftActions.length > 0 && (
        <View style={styles.line} pointerEvents="box-none">
          {leftActions.map(({ label, onPress, backgroundColor, textStyle, containerStyle }, index) => {
            return (
              <Animated.View
                key={index}
                style={[
                  styles.action,
                  containerStyle,
                  {
                    backgroundColor,
                    alignItems: 'flex-end',
                    right: deviceWidth - snapPointWidth * (leftActions.length - index),
                    transform:
                      leftActions.length > 0
                        ? [
                            {
                              translateX: interpolate(translateX, {
                                inputRange: [0, snapPointWidth * leftActions.length],
                                outputRange: [-snapPointWidth * (leftActions.length - index), 0],
                              }),
                            },
                          ]
                        : [],
                  },
                ]}
              >
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={onPress}
                  style={{
                    width: snapPointWidth,
                    height,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text style={textStyle}>{label}</Text>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>
      )}
      {rightActions.length > 0 && (
        <View style={styles.line} pointerEvents="box-none">
          {rightActions.map(({ label, onPress, backgroundColor, textStyle, containerStyle }, index) => {
            return (
              <Animated.View
                key={index}
                style={[
                  styles.action,
                  containerStyle,
                  {
                    backgroundColor,
                    alignItems: 'flex-start',
                    left: deviceWidth - snapPointWidth * (rightActions.length - index),
                    transform:
                      rightActions.length > 0
                        ? [
                            {
                              translateX: interpolate(translateX, {
                                inputRange: [-snapPointWidth * rightActions.length, 0],
                                outputRange: [0, snapPointWidth * (rightActions.length - index)],
                              }),
                            },
                          ]
                        : [],
                  },
                ]}
              >
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={onPress}
                  style={{
                    width: snapPointWidth,
                    height,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text style={textStyle}>{label}</Text>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>
      )}
      <PanGestureHandler {...gestureHandler} maxPointers={1} minDist={10}>
        <Animated.View style={{ transform: [{ translateX }] }}>{children}</Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default SwipeRow;
