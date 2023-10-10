import React, { forwardRef, useMemo } from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { mix, mixColor } from 'react-native-redash';

import { useTheme } from '@shopify/restyle';

import Box from '../box';
import helpers from '../helpers';
import Text from '../text';
import { Theme } from '../theme';
import useSwitch from './useSwitch';

const { px } = helpers;
export interface SwitchProps {
  /** 选中改变事件 */
  onChange?: (checked: boolean) => void;
  /** 是否选中 */
  checked?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 选中背景颜色 */
  activeBackground?: string;
  /** 是否显示文字 */
  showText?: boolean;
  /** 开关打开时的文字 */
  onText?: string;
  /** 开关关闭时的文字 */
  offText?: string;
  /** 宽度 */
  width?: number;
}

const SWITCH_WIDTH = px(50);

const Switch = forwardRef<unknown, SwitchProps>(
  (
    {
      checked = false,
      disabled = false,
      onChange,
      activeBackground,
      showText = false,
      onText = '开',
      offText = '关',
      width = SWITCH_WIDTH,
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _ref
  ) => {
    const theme = useTheme<Theme>();

    const { progress, toggle } = useSwitch({ onChange, checked });

    const HEIGHT = width / 2;
    const HANDLER_SIZE = HEIGHT;

    const handlerStyle = useAnimatedStyle(() => ({
      borderWidth: 1,
      borderColor: mixColor(
        progress.value,
        disabled ? theme.colors.disabled : theme.colors.gray50,
        disabled ? theme.colors.primary400 : activeBackground ?? theme.colors.primary200
      ),
      transform: [
        {
          translateX: mix(progress.value, 0, width / 2),
        },
      ],
    }));

    const containerStyle = useAnimatedStyle(() => ({
      backgroundColor: mixColor(
        progress.value,
        disabled ? theme.colors.disabled : theme.colors.gray50,
        disabled ? theme.colors.primary400 : activeBackground ?? theme.colors.primary200
      ) as any,
    }));

    const styles = StyleSheet.create({
      content: {
        width,
        height: HEIGHT,
        borderRadius: HEIGHT,
        justifyContent: 'center',
      },
      handler: {
        width: HANDLER_SIZE,
        height: HANDLER_SIZE,
        borderRadius: HANDLER_SIZE,
        backgroundColor: disabled ? theme.colors.gray50 : theme.colors.white,
        justifyContent: 'center',
        alignItems: 'center',
      },
      text: { fontSize: HANDLER_SIZE / 2, color: theme.colors.primary200 },
    });

    const Content = useMemo(() => {
      return (
        <Animated.View style={[styles.content, containerStyle]}>
          <Animated.View style={[styles.handler, handlerStyle]}>
            {showText ? (
              checked ? (
                <Text style={styles.text}>{offText}</Text>
              ) : (
                <Text style={styles.text}>{onText}</Text>
              )
            ) : (
              <Box />
            )}
          </Animated.View>
        </Animated.View>
      );
    }, [checked, disabled, showText, onText, offText, containerStyle, handlerStyle]);

    if (disabled) {
      return Content;
    }
    return <TouchableWithoutFeedback onPress={toggle}>{Content}</TouchableWithoutFeedback>;
  }
);
Switch.displayName = 'Switch';

export default Switch;
