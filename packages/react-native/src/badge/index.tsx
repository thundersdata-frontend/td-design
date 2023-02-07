import React, { FC, PropsWithChildren } from 'react';
import { TextStyle, View, ViewStyle } from 'react-native';

import Flex from '../flex';
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
    <Flex>
      <View>
        {props.children}
        {!isHidden && contentDom}
      </View>
    </Flex>
  );
};
Badge.displayName = 'Badge';

export default Badge;
