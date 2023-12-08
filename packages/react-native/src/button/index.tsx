import React, { FC, ReactNode, useMemo } from 'react';
import { DimensionValue } from 'react-native';

import helpers from '../helpers';
import UIActivityIndicator from '../indicator/UIActivityIndicator';
import Pressable, { PressableProps } from '../pressable';
import Text from '../text';
import useButton from './useButton';

const { px } = helpers;
export type ButtonProps = PressableProps & {
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
  /** 圆角 */
  borderRadius?: number;
  /** 不显示border */
  borderless?: boolean;
  /** 按钮大小 */
  size?: 'default' | 'small' | 'large';
};

const Button: FC<ButtonProps> = props => {
  const { loading, title } = props;

  const { pressableProps, textColor, variant, indicatorColor, loadingIconSize } = useButton(props);

  const Title = useMemo(() => {
    if (typeof title === 'string')
      return (
        <Text variant={variant} color={textColor}>
          {title}
        </Text>
      );
    return title;
  }, [title, textColor, variant]);

  return (
    <Pressable {...pressableProps}>
      {!!loading && (
        <UIActivityIndicator
          color={indicatorColor}
          size={loadingIconSize}
          animating={loading}
          style={{ marginRight: px(4) }}
        />
      )}
      {Title}
    </Pressable>
  );
};
Button.displayName = 'Button';

export default Button;
