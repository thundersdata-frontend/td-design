import React, { FC, useEffect } from 'react';
import Animated, { useAnimatedStyle, useDerivedValue, useSharedValue, withSpring } from 'react-native-reanimated';
import { TouchableWithoutFeedback } from 'react-native';
import helpers from '../helpers';
import { Theme } from '../theme';
import Text from '../text';
import { useTheme } from '@shopify/restyle';
import { mix, mixColor } from 'react-native-redash';

const { px } = helpers;
interface SwitchProps {
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

const springConfig = {
  mass: 1,
  damping: 15,
  stiffness: 120,
  overshootClamping: false,
  restSpeedThreshold: 0.001,
  restDisplacementThreshold: 0.001,
};
const Switch: FC<SwitchProps> = ({
  checked = false,
  disabled = false,
  onChange,
  activeBackground,
  showText = false,
  onText = '开',
  offText = '关',
}) => {
  const theme = useTheme<Theme>();

  const opened = useSharedValue(checked);
  const progress = useDerivedValue(() => (opened.value ? withSpring(1, springConfig) : withSpring(0, springConfig)));
  useEffect(() => {
    opened.value = checked;
  }, [checked, opened]);

  const toggle = () => {
    opened.value = !opened.value;
    onChange?.(!checked);
  };

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
      disabled ? theme.colors.switch_inactive_background_disabled : theme.colors.switch_inactive_background,
      disabled
        ? theme.colors.switch_active_background_disabled
        : activeBackground ?? theme.colors.switch_active_background
    ),
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
            backgroundColor: disabled ? theme.colors.switch_inactive_disabled : theme.colors.white,
            justifyContent: 'center',
            alignItems: 'center',
          },
          handlerStyle,
        ]}
      >
        {showText ? (
          checked ? (
            <Text style={{ fontSize: px(12), color: theme.colors.switch_text }}>{offText}</Text>
          ) : (
            <Text style={{ fontSize: px(12), color: theme.colors.switch_text }}>{onText}</Text>
          )
        ) : null}
      </Animated.View>
    </Animated.View>
  );

  if (disabled) {
    return Content;
  }
  return <TouchableWithoutFeedback onPress={toggle}>{Content}</TouchableWithoutFeedback>;
};
export default Switch;
