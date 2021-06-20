import React, { FC, ReactNode, useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import { spacing, layout, SpacingProps, useRestyle, useTheme } from '@shopify/restyle';

import { UIActivityIndicator } from '../indicator';
import Text from '../text';
import { Theme } from '../theme';
import helpers from '../helpers';

const { px } = helpers;
const restyleFunctions = [spacing, layout];

export type ButtonProps = SpacingProps<Theme> & {
  /** 按钮文字内容 */
  title: ReactNode;
  /** 按钮展示类型 */
  type?: 'primary' | 'secondary' | 'text';
  /** 是否失效 */
  disabled?: boolean;
  /** 是否加载中 */
  loading?: boolean;
  /** 按钮点击事件 */
  onPress: () => void;
  /** 按钮的宽度 */
  width?: number | string;
  /**圆角 */
  borderRadius?: number;
};

const Button: FC<ButtonProps> = props => {
  const theme = useTheme<Theme>();
  const {
    onPress,
    title,
    type = 'primary',
    width = '100%',
    disabled = false,
    loading,
    borderRadius = theme.borderRadii.x1,
    ...restProps
  } = props;

  const isDisabled = disabled || loading;

  const backgroundColor = useMemo(() => {
    if (type === 'primary') {
      return isDisabled ? theme.colors.primary_disabled : theme.colors.primary200;
    } else if (type === 'secondary') {
      return isDisabled ? theme.colors.disabled : theme.colors.background;
    }
    return theme.colors.transparent;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDisabled, type]);

  const textColor = useMemo(() => {
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
      borderRadius,
    },
    ...restProps,
  });

  return (
    <TouchableOpacity {...touchableProps}>
      {loading !== undefined && ['primary', 'secondary'].includes(type) && (
        <UIActivityIndicator
          color={type === 'secondary' ? theme.colors.primary200 : theme.colors.primary200}
          size={24}
          animating={loading}
          style={{ marginRight: px(4) }}
        />
      )}
      {typeof title === 'string' ? (
        <Text variant="p0" color={textColor}>
          {title}
        </Text>
      ) : (
        title
      )}
    </TouchableOpacity>
  );
};

export default Button;
