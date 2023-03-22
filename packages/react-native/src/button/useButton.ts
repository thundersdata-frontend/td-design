import { TouchableOpacityProps } from 'react-native';

import { composeRestyleFunctions, layout, spacing, useRestyle, useTheme } from '@shopify/restyle';

import type { ButtonProps } from '.';
import helpers from '../helpers';
import { Color, Theme } from '../theme';

const { px } = helpers;
const restyleFunctions = composeRestyleFunctions([spacing, layout]);
export default function useButton(props: ButtonProps) {
  const theme = useTheme<Theme>();
  const {
    loading,
    type = 'primary',
    width = '100%',
    height = px(44),
    disabled = false,
    borderRadius = theme.borderRadii.x1,
    onPress,
    borderless = false,
    ...restProps
  } = props;

  let textColor = 'white';
  let backgroundColor = theme.colors.transparent;
  let indicatorColor = disabled ? theme.colors.gray400 : theme.colors.white;

  if (type === 'primary') {
    backgroundColor = disabled ? theme.colors.primary400 : theme.colors.primary200;
  } else if (type === 'secondary') {
    textColor = disabled ? 'gray400' : 'primary200';
    backgroundColor = disabled ? theme.colors.disabled : theme.colors.transparent;
    indicatorColor = disabled ? theme.colors.gray400 : theme.colors.primary200;
  }

  let borderWidth = 0;
  if (!borderless) {
    borderWidth = type === 'secondary' ? 1 : 0;
  }

  /** 容器属性 */
  const touchableProps = useRestyle(restyleFunctions as any, {
    disabled,
    onPress: () => {
      if (loading) return;
      onPress?.();
    },
    activeOpacity: disabled ? 1 : 0.6,
    style: {
      height,
      width,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor,
      borderWidth,
      borderColor:
        type === 'primary' ? theme.colors.border : disabled ? theme.colors.disabled : theme.colors.primary200,
      borderRadius,
    },
    ...restProps,
  });

  return {
    textColor,
    indicatorColor,
    touchableProps,
  } as {
    textColor: Color;
    indicatorColor: string;
    touchableProps: TouchableOpacityProps;
  };
}
