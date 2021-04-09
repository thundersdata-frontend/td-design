import React, { FC, ReactNode, useEffect } from 'react';
import Animated, {
  Easing,
  interpolate,
  useCode,
  call,
  cond,
  onChange as onChangeR,
  eq,
  useValue,
} from 'react-native-reanimated';
import { mix, interpolateColor, useTapGestureHandler, withTransition } from 'react-native-redash';
import { TapGestureHandler, State } from 'react-native-gesture-handler';
import { px } from '../helper';
import { Theme } from '../config/theme';
import Text from '../text';
import { useTheme } from '@shopify/restyle';

interface SwitchProps {
  /** 选中改变事件 */
  onChange?: (checked: boolean) => void;
  /** 是否选中 */
  checked?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 选中背景颜色 */
  color?: string;
  /**选中时开关的文字支持自定义render */
  checkLabel?: string | ReactNode;
  /**未选中是、时开关的文字支持自定义render */
  uncheckLabel?: string | ReactNode;
}

const width = px(26);
const Switch: FC<SwitchProps> = ({ checked = false, disabled = false, onChange, color, checkLabel, uncheckLabel }) => {
  const theme = useTheme<Theme>();
  const checkedColor = color ?? theme.colors.switch_default;
  const { gestureHandler, state } = useTapGestureHandler();
  const opened = useValue<number>(checked ? 1 : 0);

  useCode(
    () =>
      onChangeR(
        state,
        cond(eq(state, State.END), [
          call([], () => {
            onChange?.(!checked);
          }),
        ])
      ),
    [checked]
  );

  useEffect(() => {
    opened.setValue(checked ? 1 : 0);
  }, [checked, opened]);

  /**
   * 移动动画
   */
  const animation = withTransition(opened, { duration: 100, easing: Easing.linear });
  const translateXRange = checked ? [-px(18), 0] : [0, px(18)];
  const translateX = interpolate(animation, {
    inputRange: [0, 1],
    outputRange: translateXRange,
  });

  /**
   * 背景改变
   */
  const backgroundColorRange = [theme.colors.switch_foreground, checkedColor];
  const backgroundColor = (interpolateColor(animation, {
    inputRange: [0, 1],
    outputRange: backgroundColorRange,
  }) as unknown) as Animated.Node<string>;

  /**
   * 长按变宽
   */
  const pressAnimation = withTransition(eq(state, State.BEGAN), { duration: 300, easing: Easing.linear });
  const scale = mix(pressAnimation, width, width * 1.2);

  const circleRender = () => {
    const activeDom = typeof checkLabel === 'string' ? <Text variant="hint4">{checkLabel}</Text> : checkLabel;
    const inactiveDom = typeof uncheckLabel === 'string' ? <Text variant="hint4">{uncheckLabel}</Text> : uncheckLabel;
    return checked ? activeDom : inactiveDom;
  };

  const Content = (
    <Animated.View
      style={[
        {
          justifyContent: 'center',
          borderColor: theme.colors.switch_border,
          borderWidth: px(1),
          width: px(50),
          height: px(30),
          borderRadius: px(30),
          backgroundColor: disabled ? theme.colors.switch_disabled : backgroundColor,
        },
      ]}
    >
      <Animated.View
        style={{
          width: scale,
          alignSelf: checked ? 'flex-end' : 'flex-start',
          height: width,
          borderColor: theme.colors.switch_border,
          borderWidth: px(1),
          backgroundColor: disabled ? theme.colors.switch_disabled : theme.colors.switch_background,
          borderRadius: width,
          transform: [{ translateX }],
          overflow: 'hidden',
        }}
      >
        <Animated.View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          {circleRender()}
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );

  if (disabled) {
    return Content;
  }
  return <TapGestureHandler {...gestureHandler}>{Content}</TapGestureHandler>;
};
export default Switch;
