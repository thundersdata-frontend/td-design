import { useCreation } from '@td-design/rn-hooks';
import { useTheme, spacing, layout, useRestyle } from '@shopify/restyle';
import { Color, Theme } from '../theme';
import helpers from '../helpers';

import type { ButtonProps } from '.';

const { px } = helpers;
const restyleFunctions = [spacing, layout];
export default function useButton({
  loading,
  type = 'primary',
  width = '100%',
  disabled = false,
  borderRadius,
  onPress,
  ...restProps
}: ButtonProps) {
  const theme = useTheme<Theme>();
  const isDisabled = disabled || loading;

  const backgroundColor = useCreation(() => {
    if (type === 'primary') {
      return isDisabled ? theme.colors.primary_disabled : theme.colors.primary200;
    } else if (type === 'secondary') {
      return isDisabled ? theme.colors.disabled : theme.colors.background;
    }
    return theme.colors.transparent;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDisabled, type]);

  const textColor = useCreation(() => {
    switch (type) {
      case 'primary':
      default:
        return isDisabled ? 'gray200' : 'white';

      case 'secondary':
        return isDisabled ? 'primary300' : 'primary200';

      case 'text':
        return isDisabled ? 'gray200' : 'primary200';
    }
  }, [isDisabled, type]);

  const _borderRadius = borderRadius ?? theme.borderRadii.x1;

  /** 容器属性 */
  const touchableProps = useRestyle(restyleFunctions, {
    disabled: isDisabled,
    onPress: () => {
      if (loading) return;
      onPress?.();
    },
    activeOpacity: isDisabled ? 1 : 0.8,
    style: {
      height: type === 'text' ? 'auto' : px(44),
      width: type === 'text' ? 'auto' : width,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor,
      borderWidth: type === 'secondary' ? 1 : 0,
      borderColor:
        type === 'primary' ? theme.colors.border : isDisabled ? theme.colors.disabled : theme.colors.primary200,
      borderRadius: _borderRadius,
    },
    ...restProps,
  });

  return {
    theme,
    textColor,
    touchableProps,
  } as {
    theme: Theme;
    textColor: Color;
    touchableProps: any;
  };
}
