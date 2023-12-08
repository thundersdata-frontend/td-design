import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { useTheme } from '@shopify/restyle';

import type { ButtonProps } from '.';
import helpers from '../helpers';
import { PressableProps } from '../pressable';
import { Color, Theme, Variant } from '../theme';

const { px, ONE_PIXEL } = helpers;

export default function useButton(props: ButtonProps) {
  const theme = useTheme<Theme>();
  const {
    loading,
    type = 'primary',
    width = '100%',
    size = 'default',
    disabled = false,
    borderRadius = theme.borderRadii.x1,
    onPress,
    borderless = false,
    style,
    ...restProps
  } = props;

  let textColor: Color = 'text_active';
  let backgroundColor = theme.colors.transparent;
  let indicatorColor = disabled ? theme.colors.gray200 : theme.colors.white;

  if (type === 'primary') {
    backgroundColor = disabled ? theme.colors.primary400 : theme.colors.primary200;
  } else if (type === 'secondary') {
    textColor = disabled ? 'gray200' : 'primary200';
    backgroundColor = disabled ? theme.colors.disabled : theme.colors.transparent;
    indicatorColor = disabled ? theme.colors.gray200 : theme.colors.primary200;
  }

  let borderWidth = 0;
  if (!borderless) {
    borderWidth = type === 'secondary' ? ONE_PIXEL : 0;
  }

  const { variant, paddingVertical, loadingIconSize } = useMemo(() => {
    switch (size) {
      case 'default':
      default:
        return {
          variant: 'p1' as Variant,
          paddingVertical: theme.spacing.x2,
          loadingIconSize: px(16),
        };

      case 'large':
        return {
          variant: 'p0' as Variant,
          paddingVertical: theme.spacing.x3,
          loadingIconSize: px(20),
        };

      case 'small':
        return {
          variant: 'p2' as Variant,
          paddingVertical: theme.spacing.x1,
          loadingIconSize: px(12),
        };
    }
  }, [size]);

  /** 容器属性 */
  const pressableProps: PressableProps = {
    disabled,
    onPress: () => {
      if (loading) return;
      onPress?.();
    },
    activeOpacity: disabled ? 1 : 0.6,
    style: StyleSheet.flatten([
      {
        width,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor,
        borderWidth,
        borderColor:
          type === 'primary' ? theme.colors.border : disabled ? theme.colors.disabled : theme.colors.primary200,
        borderRadius,
        paddingVertical,
      },
      style,
    ]),
    ...restProps,
  };

  return {
    variant,
    textColor,
    indicatorColor,
    pressableProps,
    loadingIconSize,
  };
}
