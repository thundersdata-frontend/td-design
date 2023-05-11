import React, { cloneElement, FC, ReactElement } from 'react';
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
  /** 子组件 */
  children: ReactElement;
}

const Badge: FC<BadgeProps> = props => {
  const { renderContent, onBadgeLayout, width, height } = useBadge(props);

  return (
    <Box width={width} height={height}>
      {cloneElement(props.children, {
        onLayout: onBadgeLayout,
      })}
      {renderContent()}
    </Box>
  );
};
Badge.displayName = 'Badge';

export default Badge;
