import React, { FC, ReactNode } from 'react';
import { GestureResponderEvent, ActivityIndicator, TouchableHighlight, TouchableHighlightProps } from 'react-native';
import { spacing, layout, SpacingProps, useRestyle, useTheme } from '@shopify/restyle';

import Text from '../text';
import { Theme } from '../theme';
import helpers from '../helpers';

const { px } = helpers;
const restyleFunctions = [spacing, layout];

// 按钮宽度
export const WIDTH = {
  /** 大按钮 */
  LARGE: '100%',
  /** 中按钮 */
  MIDDLE: '50%',
  /** 小按钮 */
  SMALL: '25%',
};
const ROUND_RADIUS = px(30);

export type ButtonProps = SpacingProps<Theme> &
  TouchableHighlightProps & {
    /** 按钮文字内容 */
    title: ReactNode;
    /** 按钮展示类型 */
    type?: 'primary' | 'secondary' | 'link' | 'text';
    /** 是否失效 */
    disabled?: boolean;
    /** 是否加载中 */
    loading?: boolean;
    /** 按钮点击事件 */
    onPress: () => void;
    /** 按钮的宽度 */
    width?: number | string;
    /** 按钮的形状 */
    shape?: 'round' | 'default';
  };

const Button: FC<ButtonProps> = props => {
  const theme = useTheme<Theme>();
  const {
    onPress,
    title,
    type = 'primary',
    shape = 'default',
    width = WIDTH.LARGE,
    disabled = false,
    loading,
    ...restProps
  } = props;

  const getUnderlayColorByType = () => {
    if (type === 'primary') {
      return theme.colors.button_primary_underlay;
    } else if (type === 'secondary') {
      return theme.colors.button_secondary_underlay;
    }
    return theme.colors.button_other_underlay;
  };

  const getBgColorByType = () => {
    if (type === 'primary') {
      return disabled ? theme.colors.button_primary_background_disabled : theme.colors.button_primary_background;
    }
    if (type === 'secondary') {
      return disabled ? theme.colors.button_secondary_background_disabled : theme.colors.button_secondary_background;
    }
    return theme.colors.button_other_background;
  };

  /** 容器属性 */
  const touchableProps = useRestyle(restyleFunctions, {
    disabled,
    onPress: (event: GestureResponderEvent) => {
      if (loading) return;
      onPress?.(event);
    },
    activeOpacity: disabled ? 0.8 : 1,
    underlayColor: getUnderlayColorByType(),
    style: {
      height: ['link', 'text'].includes(type) ? 'auto' : px(44),
      width: ['link', 'text'].includes(type) ? 'auto' : width,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: getBgColorByType(),
      borderWidth: type === 'secondary' ? 1 : 0,
      opacity: disabled ? 0.8 : 1,
      borderColor: type === 'primary' ? theme.colors.button_primary_border : theme.colors.button_other_border,
      borderRadius: shape === 'default' ? theme.borderRadii.base : ROUND_RADIUS,
    },
    ...restProps,
  });

  const getVariantByType = () => {
    switch (type) {
      case 'primary':
      default:
        return 'content2';
      case 'secondary':
      case 'link':
        return 'hint2';
      case 'text':
        return 'hint1';
    }
  };

  /** 渲染 button 内容 */
  const renderTitle = () => {
    const contentText = typeof title === 'string' ? <Text variant={getVariantByType()}>{title}</Text> : title;
    const getContent = () => (
      <>
        {loading !== undefined && ['primary', 'secondary'].includes(type) && (
          <ActivityIndicator
            color={type === 'secondary' ? theme.colors.button_secondary_loading : theme.colors.button_other_loading}
            animating={loading}
            style={{ marginRight: px(4) }}
          />
        )}
        {contentText}
      </>
    );
    return getContent();
  };

  return <TouchableHighlight {...touchableProps}>{renderTitle()}</TouchableHighlight>;
};

export default Object.assign(Button, { WIDTH });
