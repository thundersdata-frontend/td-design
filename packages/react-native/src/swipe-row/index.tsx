import React, { FC } from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { useTheme } from '@shopify/restyle';
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  withSpring,
  withTiming,
  Easing,
  useAnimatedStyle,
} from 'react-native-reanimated';

import helpers from '../helpers';
import { Theme } from '../theme';

const { deviceWidth, px } = helpers;
export interface SwipeAction {
  /** 操作项文本 */
  label: string;
  /** 操作项文本样式 */
  textStyle?: StyleProp<TextStyle>;
  /** 操作项点击事件 */
  onPress: () => void;
  /** 背景色 */
  backgroundColor: string;
}

export interface SwipeRowProps {
  /** 右侧滑出的操作项 */
  actions?: SwipeAction[];
  /** 行高 */
  height?: number;
  /** 每个操作项的宽度 */
  actionWidth?: number;
  /** 删除事件 */
  onRemove?: () => Promise<boolean>;
  /** 自定义style  */
  style?: StyleProp<ViewStyle>;
}

const SwipeRow: FC<SwipeRowProps> = ({
  actions = [],
  height = px(60),
  actionWidth = height,
  onRemove,
  style = {},
  children,
}) => {
  const MAX_TRANSLATE = -actionWidth * (1 + actions.length);
  const theme = useTheme<Theme>();
  const springConfig = (velocity: number) => {
    'worklet';
    return {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
      velocity,
    };
  };
  const timingConfig = {
    duration: 400,
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
  };

  const removing = useSharedValue(false);
  const translateX = useSharedValue(0);
  const handler = useAnimatedGestureHandler({
    onStart(_, ctx: Record<string, number>) {
      ctx.offsetX = translateX.value;
    },
    onActive(evt, ctx) {
      translateX.value = evt.translationX + ctx.offsetX;
    },
    onEnd(evt) {
      if (evt.velocityX < -20) {
        translateX.value = withSpring(MAX_TRANSLATE, springConfig(evt.velocityX));
      } else {
        translateX.value = withSpring(0, springConfig(evt.velocityX));
      }
    },
  });

  const wrapStyle = useAnimatedStyle(() => {
    if (removing.value) {
      return {
        height: withTiming(0, timingConfig),
        transform: [{ translateX: withTiming(-deviceWidth, timingConfig) }],
      };
    }
    return {
      height,
      width: deviceWidth,
      backgroundColor: theme.colors.white,
      transform: [{ translateX: translateX.value }],
    };
  });

  const buttonStyle = useAnimatedStyle(() => {
    if (removing.value) {
      return {
        height: withTiming(0, timingConfig),
      };
    }
    return {
      height,
    };
  });

  const handleRemove = async () => {
    if (!onRemove) {
      removing.value = true;
      return;
    }
    const result = await onRemove();
    removing.value = result;
  };

  /** 操作按钮 */
  const actionButtons = actions.concat({
    label: '删除',
    onPress: handleRemove,
    backgroundColor: theme.colors.func600,
  });

  return (
    <View style={styles.item}>
      <PanGestureHandler activeOffsetX={[-10, 10]} onGestureEvent={handler}>
        <Animated.View style={[wrapStyle, style]}>{children}</Animated.View>
      </PanGestureHandler>
      <Animated.View style={[buttonStyle, styles.buttonContainer]}>
        {actionButtons.map((action, index) => (
          <View
            key={index}
            style={[
              {
                backgroundColor: action.backgroundColor,
                width: actionWidth,
                height: height - 1,
              },
            ]}
          >
            <TouchableOpacity onPress={action.onPress} style={styles.buttonInner}>
              <Text style={[{ color: theme.colors.white }, action.textStyle]}>{action.label}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </Animated.View>
    </View>
  );
};

export default SwipeRow;

const styles = StyleSheet.create({
  item: {
    justifyContent: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    zIndex: -1,
    overflow: 'hidden',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonInner: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
