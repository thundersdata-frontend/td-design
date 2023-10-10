/**
 * https://github.com/facebook/react-native/blob/16ea9ba8133a5340ed6751ec7d49bf03a0d4c5ea/Libraries/Pressability/Pressability.js#L347
 * # State Machine
 *
 * ┌───────────────┐ ◀──── RESPONDER_RELEASE
 * │ NOT_RESPONDER │
 * └───┬───────────┘ ◀──── RESPONDER_TERMINATED
 *     │
 *     │ RESPONDER_GRANT (HitRect)
 *     │
 *     ▼
 * ┌─────────────────────┐          ┌───────────────────┐              ┌───────────────────┐
 * │ RESPONDER_INACTIVE_ │  DELAY   │ RESPONDER_ACTIVE_ │  T + DELAY   │ RESPONDER_ACTIVE_ │
 * │ PRESS_IN            ├────────▶ │ PRESS_IN          ├────────────▶ │ LONG_PRESS_IN     │
 * └─┬───────────────────┘          └─┬─────────────────┘              └─┬─────────────────┘
 *   │           ▲                    │           ▲                      │           ▲
 *   │LEAVE_     │                    │LEAVE_     │                      │LEAVE_     │
 *   │PRESS_RECT │ENTER_              │PRESS_RECT │ENTER_                │PRESS_RECT │ENTER_
 *   │           │PRESS_RECT          │           │PRESS_RECT            │           │PRESS_RECT
 *   ▼           │                    ▼           │                      ▼           │
 * ┌─────────────┴───────┐          ┌─────────────┴─────┐              ┌─────────────┴─────┐
 * │ RESPONDER_INACTIVE_ │  DELAY   │ RESPONDER_ACTIVE_ │              │ RESPONDER_ACTIVE_ │
 * │ PRESS_OUT           ├────────▶ │ PRESS_OUT         │              │ LONG_PRESS_OUT    │
 * └─────────────────────┘          └───────────────────┘              └───────────────────┘
 *
 * T + DELAY => LONG_PRESS_DELAY + DELAY
 *
 * Not drawn are the side effects of each transition. The most important side
 * effect is the invocation of `onPress` and `onLongPress` that occur when a
 * responder is release while in the "press in" states.
 */
import React, { memo, PropsWithChildren } from 'react';
import { Pressable as RNPressable, PressableProps as RNPressableProps, StyleProp, ViewStyle } from 'react-native';

import helpers from '../helpers';

type Rect = {
  bottom: number;
  top: number;
  left: number;
  right: number;
};

export interface PressableProps
  extends Pick<
    RNPressableProps,
    'onPress' | 'onPressIn' | 'onPressOut' | 'onLongPress' | 'disabled' | 'delayLongPress' | 'onLayout'
  > {
  /** 点击时的不透明度 */
  activeOpacity?: number;
  /** 手指移出组件但扔持有点击状态的距离 */
  pressOffset?: number | Rect;
  /** 离组件触发 onPressIn 的距离 */
  hitOffset?: number | Rect;
  /** 是否激活缩放动效  */
  scalable?: boolean;
  style?: StyleProp<ViewStyle>;
}

const { px } = helpers;
function Pressable(props: PropsWithChildren<PressableProps>) {
  const {
    children,
    activeOpacity = 0.6,
    pressOffset = px(20),
    hitOffset,
    delayLongPress = 1000,
    style,
    ...rest
  } = props;

  if (!children) return null;

  return (
    <RNPressable
      android_disableSound={false}
      android_ripple={null}
      pressRetentionOffset={pressOffset}
      hitSlop={hitOffset}
      delayLongPress={delayLongPress}
      style={({ pressed }) => [{ opacity: pressed ? activeOpacity : 1 }, style]}
      {...rest}
    >
      {children}
    </RNPressable>
  );
}
Pressable.displayName = 'Pressable';

export default memo(Pressable);
