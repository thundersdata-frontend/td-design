import { useTheme } from '@shopify/restyle';
import React, { FC } from 'react';
import { View } from 'react-native';
import { Theme } from '..';
import { ONE_PIXEL, px } from '../helper';

type DividerProps = {
  /** 水平或是垂直 */
  type?: 'vertical' | 'horizontal';
  /** 垂直时的分割线的高度，默认是px(12) */
  verticalHeight?: number;
};

const Divider: FC<DividerProps> = ({ type = 'horizontal', verticalHeight = px(12) }) => {
  const theme = useTheme<Theme>();

  return (
    <View
      style={[
        { backgroundColor: theme.colors.borderColor },
        type === 'horizontal'
          ? {
              height: ONE_PIXEL,
            }
          : {
              width: ONE_PIXEL,
              height: verticalHeight,
              marginHorizontal: px(8),
            },
      ]}
    />
  );
};

export default Divider;
