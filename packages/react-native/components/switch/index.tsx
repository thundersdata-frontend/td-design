import React, { FC, ReactNode, useEffect, useState } from 'react';
import { px } from '../helper';
import { TouchableNativeFeedback } from 'react-native';
import { theme } from '../config/theme';
import Animated, { Easing, interpolate } from 'react-native-reanimated';
import { interpolateColor, mix, useTransition } from 'react-native-redash';
import Text from '../text';

interface SwitchProps {
  onChange?: (checked: boolean) => void;
  checked?: boolean;
  disabled?: boolean;
  color?: string;
  circleActive?: string | ReactNode;
  circleInactive?: string | ReactNode;
}

const Switch: FC<SwitchProps> = ({
  checked = false,
  disabled = false,
  onChange,
  color,
  circleActive,
  circleInactive,
}) => {
  const width = px(26);
  const checkedColor = color || (disabled ? theme.colors.backgroundColor1 : theme.colors.primaryColor);

  const [open, setOpen] = useState(false);
  const [press, setPress] = useState(false);
  useEffect(() => {
    setOpen(checked);
  }, [checked]);

  /**
   * 移动动画
   */
  const transition = useTransition(open, { duration: 300, easing: Easing.linear });
  const transitionX = checked ? [-px(18), 0] : [0, px(18)];
  const switchTranslate = interpolate(transition, {
    inputRange: [0, 1],
    outputRange: transitionX,
  });

  /**
   * 背景改变
   */
  const backgroundColorRange = [disabled ? theme.colors.borderColor : theme.colors.white, checkedColor];
  const backgroundColor = (interpolateColor(transition, {
    inputRange: [0, 1],
    outputRange: backgroundColorRange,
  }) as unknown) as Animated.Node<string>;
  /**
   * 背景改变
   */
  const borderColor = (interpolateColor(transition, {
    inputRange: [0, 1],
    outputRange: [theme.colors.borderColor, checkedColor],
  }) as unknown) as Animated.Node<string>;
  /**
   * 长按变宽
   */
  const ellipseTransition = useTransition(press, { duration: 300, easing: Easing.linear });
  const ellipseWidth = mix(ellipseTransition, width, width * 1.2);

  const circleRender = () => {
    const activeDom =
      typeof circleActive === 'string' ? (
        <Text style={{ color: theme.colors.secondaryTextColor }}>{circleActive}</Text>
      ) : (
        circleActive
      );
    const inactiveDom =
      typeof circleInactive === 'string' ? (
        <Text style={{ color: theme.colors.secondaryTextColor }}>{circleInactive}</Text>
      ) : (
        circleInactive
      );
    return checked ? activeDom : inactiveDom;
  };

  return (
    <TouchableNativeFeedback
      onLongPress={() => {
        !disabled && onChange && setPress(true);
      }}
      delayLongPress={100}
      onPressOut={() => {
        setPress(false);
        !disabled && onChange && onChange(!checked);
      }}
    >
      <Animated.View
        style={[
          {
            justifyContent: 'center',
            borderColor: borderColor,
            borderWidth: px(2),
            width: px(50),
            height: px(30),
            borderRadius: px(30),
            backgroundColor: backgroundColor,
          },
        ]}
      >
        <Animated.View
          style={{
            width: ellipseWidth,
            alignSelf: checked ? 'flex-end' : 'flex-start',
            height: width,
            borderColor: theme.colors.borderColor,
            borderWidth: px(1),
            backgroundColor: theme.colors.white,
            borderRadius: width,
            transform: [{ translateX: switchTranslate }],
            overflow: 'hidden',
          }}
        >
          <Animated.View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {circleRender()}
          </Animated.View>
        </Animated.View>
      </Animated.View>
    </TouchableNativeFeedback>
  );
};
export default Switch;
