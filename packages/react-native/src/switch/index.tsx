import React, { forwardRef } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { mix, mixColor } from 'react-native-redash';

import { useTheme } from '@shopify/restyle';

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
}

const SWITCH_WIDTH = px(50);
const SWITCH_HEIGHT = px(28);
const BORDER_RADIUS = px(36.5);
const HANDLER_WIDTH = px(24);
const MAX_TRANSLATE = px(22);

const Switch = forwardRef<unknown, SwitchProps>(
  (
    { checked = false, disabled = false, onChange, activeBackground, showText = false, onText = '开', offText = '关' },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _ref
  ) => {
    const theme = useTheme<Theme>();

    const { progress, toggle } = useSwitch({ onChange, checked });

    const handlerStyle = useAnimatedStyle(() => ({
      transform: [
        {
          translateX: mix(progress.value, 0, MAX_TRANSLATE),
        },
      ],
    }));
    const containerStyle = useAnimatedStyle(() => ({
      backgroundColor: mixColor(
        progress.value,
        disabled ? theme.colors.disabled : theme.colors.gray200,
        disabled ? theme.colors.primary400 : activeBackground ?? theme.colors.primary200
      ) as any,
    }));

    const Content = (
      <Animated.View
        style={[
          {
            width: SWITCH_WIDTH,
            height: SWITCH_HEIGHT,
            padding: px(2),
            borderRadius: BORDER_RADIUS,
          },
          containerStyle,
        ]}
      >
        <Animated.View
          style={[
            {
              width: HANDLER_WIDTH,
              height: HANDLER_WIDTH,
              borderRadius: HANDLER_WIDTH,
              backgroundColor: disabled ? theme.colors.gray100 : theme.colors.white,
              justifyContent: 'center',
              alignItems: 'center',
            },
            handlerStyle,
          ]}
        >
          {showText ? (
            checked ? (
              <Text style={{ fontSize: px(12), color: theme.colors.primary200 }}>{offText}</Text>
            ) : (
              <Text style={{ fontSize: px(12), color: theme.colors.primary200 }}>{onText}</Text>
            )
          ) : null}
        </Animated.View>
      </Animated.View>
    );

    if (disabled) {
      return Content;
    }
    return <TouchableWithoutFeedback onPress={toggle}>{Content}</TouchableWithoutFeedback>;
  }
);
Switch.displayName = 'Switch';

export default Switch;
