import React, { forwardRef, PropsWithChildren, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, ViewProps } from 'react-native';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import Caret from './Caret';
import {
  ANIMATION_DURATION,
  BORDER_RADIUS,
  POPOVER_BACKGROUND_COLOR,
  POPOVER_FONT_COLOR,
  POPOVER_FONT_SIZE,
  POPOVER_PADDING,
  POPOVER_WIDTH,
} from './constant';
import { TooltipProps } from './type';

const Popover = forwardRef<
  View,
  PropsWithChildren<
    Pick<TooltipProps, 'caret' | 'caretPosition' | 'backgroundColor' | 'position' | 'style'> &
      ViewProps & { visible: boolean }
  >
>(
  (
    { backgroundColor, caret: withCaret, caretPosition, children, visible = true, position, style, ...extraProps },
    ref
  ) => {
    const isContentString = typeof children === 'string';
    const isHorizontalLayout = position === 'left' || position === 'right';
    const prevVisible = useRef(visible);

    const opacity = useSharedValue(visible ? 1 : 0);

    useEffect(() => {
      if (visible && !prevVisible.current) {
        opacity.value = withTiming(1, {
          duration: ANIMATION_DURATION,
        });
      } else if (!visible && prevVisible.current) {
        opacity.value = withTiming(0, {
          duration: ANIMATION_DURATION,
        });
      }

      prevVisible.current = visible;
    }, [visible]);

    const caret = (
      <Caret align={caretPosition} position={position} backgroundColor={backgroundColor} style={styles.caret} />
    );

    const animatedStyle = useAnimatedStyle(() => {
      if (isHorizontalLayout) {
        return {
          opacity: opacity.value,
          transform: [
            {
              translateX: interpolate(opacity.value, [0, 1], position === 'left' ? [5, 0] : [-5, 0]),
            },
          ],
        };
      } else {
        return {
          opacity: opacity.value,
          transform: [
            {
              translateY: interpolate(opacity.value, [0, 1], position === 'top' ? [5, 0] : [-5, 0]),
            },
          ],
        };
      }
    });

    return (
      <View ref={ref} style={[styles.container, style]} pointerEvents={visible ? 'auto' : 'none'} {...extraProps}>
        <Animated.View style={[animatedStyle, isHorizontalLayout && styles.containerHorizontal]}>
          {!!withCaret && (position === 'bottom' || position === 'right') && caret}

          <View
            style={[
              styles.content,
              isContentString && styles.contentTextOnly,
              !!backgroundColor && { backgroundColor },
            ]}
          >
            {isContentString ? <Text style={styles.contentText}>{children}</Text> : children}
          </View>

          {!!withCaret && (position === 'top' || position === 'left') && caret}
        </Animated.View>
      </View>
    );
  }
);

export default Popover;

const styles = StyleSheet.create({
  container: {
    width: POPOVER_WIDTH,
    overflow: 'hidden',
  },
  containerHorizontal: {
    flexDirection: 'row',
  },
  content: {
    flex: 1,
    zIndex: 1,
    backgroundColor: POPOVER_BACKGROUND_COLOR,
    borderRadius: BORDER_RADIUS * 2,
    overflow: 'hidden',
  },
  contentTextOnly: {
    padding: POPOVER_PADDING,
  },
  contentText: {
    color: POPOVER_FONT_COLOR,
    fontSize: POPOVER_FONT_SIZE,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  caret: {
    zIndex: 0,
  },
});
