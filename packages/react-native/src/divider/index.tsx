import React, { FC } from 'react';
import { View } from 'react-native';
import { useTheme } from '@shopify/restyle';

import { Theme, Spacing } from '../config/theme';
import { ONE_PIXEL, px } from '../helper';

type DividerProps = {
  /** 水平或是垂直 */
  type?: 'vertical' | 'horizontal';
  /** 水平时指定分隔线高度 */
  horizontalHeight?: number;
  /** 外边距 */
  margin?: Spacing;
  /** 分隔线颜色 */
  color?: string;
};

const Divider: FC<DividerProps> = props => {
  const theme = useTheme<Theme>();
  const { type = 'vertical', margin = 'xs', horizontalHeight = px(40), color = theme.colors.borderColor } = props;

  return (
    <View
      style={[
        { backgroundColor: color },
        type === 'vertical'
          ? {
              width: '100%',
              height: ONE_PIXEL,
              marginVertical: theme.spacing[margin],
            }
          : {
              width: ONE_PIXEL,
              height: horizontalHeight,
              marginHorizontal: theme.spacing[margin],
            },
      ]}
    />
  );
};

export default Divider;
