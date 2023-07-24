import React, { FC, ReactNode } from 'react';
import { DimensionValue, TouchableOpacity } from 'react-native';

import { SpacingProps } from '@shopify/restyle';

import helpers from '../helpers';
import UIActivityIndicator from '../indicator/UIActivityIndicator';
import Text from '../text';
import { Theme } from '../theme';
import useButton from './useButton';

const { px } = helpers;
export type ButtonProps = SpacingProps<Theme> & {
  /** 按钮文字内容 */
  title: ReactNode;
  /** 按钮展示类型 */
  type?: 'primary' | 'secondary';
  /** 是否失效 */
  disabled?: boolean;
  /** 是否加载中 */
  loading?: boolean;
  /** 按钮点击事件 */
  onPress: () => void;
  /** 按钮的宽度 */
  width?: DimensionValue;
  /** 按钮的高度 */
  height?: DimensionValue;
  /** 圆角 */
  borderRadius?: number;
  /** 不显示border */
  borderless?: boolean;
};

const Button: FC<ButtonProps> = props => {
  const { loading, title } = props;

  const { touchableProps, textColor, indicatorColor } = useButton(props);

  const renderText = () => {
    if (typeof title === 'string')
      return (
        <Text variant="p0" color={textColor}>
          {title}
        </Text>
      );
    return title;
  };

  return (
    <TouchableOpacity {...touchableProps}>
      {!!loading && (
        <UIActivityIndicator color={indicatorColor} size={px(18)} animating={loading} style={{ marginRight: px(4) }} />
      )}
      {renderText()}
    </TouchableOpacity>
  );
};
Button.displayName = 'Button';

export default Button;
