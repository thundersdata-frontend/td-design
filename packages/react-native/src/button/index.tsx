import { SpacingProps } from '@shopify/restyle';
import React, { FC, ReactNode } from 'react';
import { TouchableOpacity } from 'react-native';

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
  width?: number | string;
  /** 圆角 */
  borderRadius?: number;
};

const Button: FC<ButtonProps> = props => {
  const { loading, title } = props;

  const { touchableProps, textColor, indicatorColor } = useButton(props);

  return (
    <TouchableOpacity {...touchableProps}>
      {loading && (
        <UIActivityIndicator color={indicatorColor} size={px(18)} animating={loading} style={{ marginRight: px(4) }} />
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
