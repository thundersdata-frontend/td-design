import { useTheme } from '@shopify/restyle';
import React, { FC } from 'react';
import { View } from 'react-native';
import { Theme } from '..';
import { ONE_PIXEL, px } from '../helper';
import WhiteSpace from '../white-space';

type DividerProps = {
  /** 水平或是垂直 */
  type?: 'vertical' | 'horizontal';
  /** 垂直时的分割线的高度，默认是px(12) */
  verticalHeight?: number;
};

const Divider: FC<DividerProps> = ({ type = 'horizontal', verticalHeight = px(12) }) => {
  const theme = useTheme<Theme>();

  const HorizontalComp = () => (
    <>
      <WhiteSpace size="l" />
      <View style={{ height: ONE_PIXEL, backgroundColor: theme.colors.borderColor }} />
      <WhiteSpace size="l" />
    </>
  );

  const VerticalComp = () => (
    <View
      style={{
        width: ONE_PIXEL,
        height: verticalHeight,
        backgroundColor: theme.colors.borderColor,
        marginHorizontal: px(8),
      }}
    />
  );

  return type === 'horizontal' ? <HorizontalComp /> : <VerticalComp />;
};

export default Divider;
