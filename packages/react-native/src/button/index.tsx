import React, { FC, ReactNode } from 'react';
import { TouchableOpacity } from 'react-native';
import { SpacingProps } from '@shopify/restyle';

import UIActivityIndicator from '../indicator/UIActivityIndicator';
import Text from '../text';
import useButton from './useButton';
import { Theme } from '../theme';
import helpers from '../helpers';

const { px } = helpers;
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
  const type = props.type ?? 'primary';
  const { loading, title } = props;

  const { theme, touchableProps, textColor } = useButton(props);

  return (
    <TouchableOpacity {...touchableProps}>
      {loading && ['primary', 'secondary'].includes(type) && (
        <UIActivityIndicator
          color={type === 'secondary' ? theme.colors.primary200 : theme.colors.primary200}
          size={px(20)}
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
