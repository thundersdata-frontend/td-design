import React, { FC, PropsWithChildren } from 'react';
import { TextStyle, ViewStyle } from 'react-native';

import Box from '../box';
import useBadge from './useBadge';

export interface BadgeProps {
  /** 徽标内容 */
  text?: string | number;
  /** 展示封顶的数值 */
  max?: number;
  /** badge的形态，小圆点 | 文字 */
  type?: 'dot' | 'text';
  /** badge的容器的style */
  containerStyle?: ViewStyle;
  /** badge中文字的style */
  textStyle?: TextStyle;
}

const Badge: FC<PropsWithChildren<BadgeProps>> = props => {
  const { isHidden, contentDom } = useBadge(props);
  return (
    <Box>
      {props.children}
      {!isHidden && contentDom}
    </Box>
  );
};
Badge.displayName = 'Badge';

export default Badge;
