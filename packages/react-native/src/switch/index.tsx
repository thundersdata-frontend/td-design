import React, { FC, ReactNode, useEffect, memo } from 'react';
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
import { isEqual } from 'lodash-es';
import { px } from '../helper';
import { theme } from '../config/theme';
import Text from '../text';

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

const Switch: FC<SwitchProps> = ({ checked = false, disabled = false, onChange, color, checkLabel, uncheckLabel }) => {
  const width = px(26);
  const checkedColor = color || (disabled ? theme.colors.backgroundColor1 : theme.colors.primaryColor);
  const { gestureHandler, state } = useTapGestureHandler();
  const opened = useValue<number>(checked ? 1 : 0);

  useCode(
    () =>
      onChangeR(
        state,
        cond(eq(state, State.END), [
          call([], () => {
            !disabled && onChange?.(!checked);
          }),
        ])
      ),
    [checked, disabled]
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
  const backgroundColorRange = [disabled ? theme.colors.borderColor : theme.colors.white, checkedColor];
  const backgroundColor = (interpolateColor(animation, {
    inputRange: [0, 1],
    outputRange: backgroundColorRange,
  }) as unknown) as Animated.Node<string>;
  /**
   * 边框颜色改变
   */
  const borderColor = (interpolateColor(animation, {
    inputRange: [0, 1],
    outputRange: [theme.colors.borderColor, checkedColor],
  }) as unknown) as Animated.Node<string>;
  /**
   * 长按变宽
   */
  const pressAnimation = withTransition(eq(state, State.BEGAN), { duration: 300, easing: Easing.linear });
  const scale = !disabled ? mix(pressAnimation, width, width * 1.2) : width;

  const circleRender = () => {
    const activeDom =
      typeof checkLabel === 'string' ? <Text variant="secondaryBodyReverse">{checkLabel}</Text> : checkLabel;
    const inactiveDom =
      typeof uncheckLabel === 'string' ? <Text variant="secondaryBodyReverse">{uncheckLabel}</Text> : uncheckLabel;
    return checked ? activeDom : inactiveDom;
  };

  return (
    <TapGestureHandler {...gestureHandler}>
      <Animated.View
        style={[
          {
            justifyContent: 'center',
            borderColor: borderColor,
            borderWidth: px(1),
            width: px(50),
            height: px(30),
            borderRadius: px(30),
            backgroundColor: backgroundColor,
          },
        ]}
      >
        <Animated.View
          style={{
            width: scale,
            alignSelf: checked ? 'flex-end' : 'flex-start',
            height: width,
            borderColor: theme.colors.borderColor,
            borderWidth: px(1),
            backgroundColor: theme.colors.white,
            borderRadius: width,
            transform: [{ translateX: translateX }],
            overflow: 'hidden',
          }}
        >
          <Animated.View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {circleRender()}
          </Animated.View>
        </Animated.View>
      </Animated.View>
    </TapGestureHandler>
  );
};
export default memo(Switch, (prevProps, nextProps) => {
  return (
    isEqual(prevProps.checked, nextProps.checked) &&
    isEqual(prevProps.color, nextProps.color) &&
    isEqual(prevProps.disabled, nextProps.disabled) &&
    isEqual(prevProps.uncheckLabel, nextProps.uncheckLabel) &&
    isEqual(prevProps.checkLabel, nextProps.checkLabel)
  );
});
