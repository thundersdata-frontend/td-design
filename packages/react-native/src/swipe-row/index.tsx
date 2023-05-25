import React, { FC, PropsWithChildren, ReactText } from 'react';
import { Animated as RNAnimated, StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Animated from 'react-native-reanimated';

import { useTheme } from '@shopify/restyle';

import Box from '../box';
import Text from '../text';
import { Theme } from '../theme';
import { SwipeRowContextProvider } from './context';
import useSwipeRow from './useSwipeRow';

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

export type SwipeRowProps = PropsWithChildren<{
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
  /** 是否覆盖默认操作项 */
  overwriteDefaultActions?: boolean;
  /** Swiperable自身的样式 */
  containerStyle?: StyleProp<ViewStyle>;
  /** Swipeable的子组件样式 */
  contentContainerStyle?: StyleProp<ViewStyle>;
}>;

const SwipeRow: FC<SwipeRowProps> = ({
  anchor,
  actions = [],
  height = 60,
  actionWidth = height,
  onRemove,
  overwriteDefaultActions = false,
  children,
  containerStyle,
  contentContainerStyle,
}) => {
  const theme = useTheme<Theme>();
  const { rowAnimatedStyle, swipeableRef, changeState, handleRemove } = useSwipeRow({ anchor, onRemove, height });

  const renderRightAction = (
    props: SwipeAction & { x: number; progress: RNAnimated.AnimatedInterpolation<number> }
  ) => {
    const styles = StyleSheet.create({
      default: {
        fontSize: 16,
        color: theme.colors.white,
      },
      container: {
        flex: 1,
      },
      rect: { height, backgroundColor: props.backgroundColor, justifyContent: 'center', alignItems: 'center' },
    });

    const trans = props.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [props.x, 0],
      extrapolate: 'clamp',
    });

    return (
      <RNAnimated.View style={[styles.container, { transform: [{ translateX: trans }] }]}>
        <RectButton style={styles.rect} onPress={props.onPress}>
          <Text style={[styles.default, props.textStyle]}>{props.label}</Text>
        </RectButton>
      </RNAnimated.View>
    );
  };

  /** 操作按钮 */
  const actionButtons = overwriteDefaultActions
    ? actions
    : actions.concat({
        label: '删除',
        onPress: handleRemove,
        backgroundColor: theme.colors.func600,
      });

  const renderRightActions = (
    progress: RNAnimated.AnimatedInterpolation<number>,
    _dragAnimatedValue: RNAnimated.AnimatedInterpolation<number>
  ) => (
    <Box flexDirection={'row'} width={actionWidth * actionButtons.length}>
      {actionButtons.map((item, index) => {
        const x = (actionButtons.length - index) * actionWidth;
        return renderRightAction({ ...item, progress, x });
      })}
    </Box>
  );

  return (
    <Swipeable
      ref={swipeableRef}
      friction={1}
      overshootFriction={10}
      enableTrackpadTwoFingerGesture
      rightThreshold={40}
      renderRightActions={renderRightActions}
      onSwipeableWillOpen={() => changeState(anchor)}
      containerStyle={containerStyle}
    >
      <Animated.View style={[rowAnimatedStyle, contentContainerStyle]}>{children}</Animated.View>
    </Swipeable>
  );
};
SwipeRow.displayName = 'SwipeRow';

export default Object.assign(SwipeRow, { Provider: SwipeRowContextProvider });
