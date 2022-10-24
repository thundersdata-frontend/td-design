import React, { FC, ReactText } from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

import helpers from '../helpers';
import { SwipeRowContextProvider } from './context';
import useSwipeRow from './useSwipeRow';

const { px } = helpers;
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
  /** 必传，作为互斥的判断标准 */
  anchor: ReactText;
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
  /** 是否覆盖默认操作项 */
  overwriteDefaultActions?: boolean;
  /** children 类型 */
  children?: ChildrenType;
}

const SwipeRow: FC<SwipeRowProps> = ({
  anchor,
  actions = [],
  height = px(60),
  actionWidth = height,
  onRemove,
  style = {},
  overwriteDefaultActions = false,
  children,
}) => {
  const MAX_TRANSLATE = -actionWidth * (1 + actions.length);

  const { theme, handleRemove, handler, wrapStyle, buttonStyle } = useSwipeRow({
    anchor,
    onRemove,
    height,
    maxTranslate: MAX_TRANSLATE,
  });

  /** 操作按钮 */
  const actionButtons = overwriteDefaultActions
    ? actions
    : actions.concat({
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

export default Object.assign(SwipeRow, { SwipeRowContextProvider });

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
