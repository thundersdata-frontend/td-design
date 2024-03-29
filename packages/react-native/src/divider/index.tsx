import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import Svg, { G, Rect } from 'react-native-svg';

import { useTheme } from '@shopify/restyle';

import Box from '../box';
import Flex from '../flex';
import helpers from '../helpers';
import Text from '../text';
import { Spacing, Theme } from '../theme';

const { px, ONE_PIXEL, deviceWidth } = helpers;
type DividerProps = {
  /** 类型是实线还是虚线 */
  type?: 'solid' | 'dashed';
  /** 水平或是垂直 */
  axis?: 'horizontal' | 'vertical';
  /** 垂直时指定分隔线高度 */
  height?: number;
  /** 外边距 */
  margin?: Spacing;
  /** 分隔线颜色 */
  color?: string;
  /** 文字（水平时有效） */
  text?: string;
  /** 文字的位置 */
  textAlign?: 'left' | 'center' | 'right';
  /** 虚线间隔宽度 */
  dashGap?: number;
  /** 单格虚线宽度 */
  dashLength?: number;
  /** 虚线厚度 */
  dashThickness?: number;
};

const Divider: FC<DividerProps> = props => {
  const theme = useTheme<Theme>();
  const {
    type = 'solid',
    axis = 'horizontal',
    margin = 'x1',
    height = px(40),
    color = theme.colors.border,
    text = '',
    textAlign = 'center',
    dashGap,
    dashLength,
    dashThickness,
  } = props;

  if (!text) {
    if (type === 'dashed') {
      return axis === 'horizontal' ? (
        <HorizontalDashLine {...{ dashLength, dashThickness, dashGap, color, margin }} />
      ) : (
        <VerticalDashLine {...{ dashLength, dashThickness, dashGap, color, margin, height }} />
      );
    }
    return (
      <Box
        style={[
          { backgroundColor: color },
          axis === 'horizontal'
            ? {
                width: '100%',
                height: ONE_PIXEL,
                marginVertical: theme.spacing[margin],
              }
            : {
                width: ONE_PIXEL,
                height,
                marginHorizontal: theme.spacing[margin],
              },
        ]}
      />
    );
  }

  const styles = StyleSheet.create({
    line: {
      width: '100%',
      height: ONE_PIXEL,
      backgroundColor: color,
    },
    'prefix-left': { flex: 1 },
    'prefix-center': { flex: 1 },
    'prefix-right': { flex: 6 },
    'suffix-left': { flex: 6 },
    'suffix-center': { flex: 1 },
    'suffix-right': { flex: 1 },
    content: {
      marginHorizontal: px(8),
    },
  });

  return (
    <Flex>
      <Box style={[type === 'dashed' ? {} : styles.line, styles[`prefix-${textAlign}`]]}>
        {type === 'dashed' && <HorizontalDashLine {...{ dashLength, dashThickness, dashGap, color, margin }} />}
      </Box>
      <Box style={styles.content}>
        <Text variant="p3" color="text">
          {text}
        </Text>
      </Box>
      <Box style={[type === 'dashed' ? {} : styles.line, styles[`suffix-${textAlign}`]]}>
        {type === 'dashed' && <HorizontalDashLine {...{ dashLength, dashThickness, dashGap, color, margin }} />}
      </Box>
    </Flex>
  );
};
Divider.displayName = 'Divider';

export default Divider;

const HorizontalDashLine: React.FC<
  Pick<DividerProps, 'dashGap' | 'dashLength' | 'dashThickness' | 'color' | 'margin'>
> = ({ dashLength, dashThickness, dashGap, color, margin }) => {
  const itemWidth = dashLength ?? px(8);
  const itemHeight = dashThickness ?? px(1);
  const spacing = dashGap ? dashGap + itemWidth : px(16);
  const dashes = new Array(Math.floor(deviceWidth / spacing)).fill(null);

  return (
    <Box marginVertical={margin} width="100%">
      <Svg height={itemHeight} width="100%">
        <G>
          {dashes.map((_, index) => (
            <Rect
              key={index}
              x="0"
              y="0"
              width={itemWidth}
              height={itemHeight}
              fill={color}
              translateX={spacing * index}
            />
          ))}
        </G>
      </Svg>
    </Box>
  );
};

const VerticalDashLine: FC<
  Pick<DividerProps, 'dashGap' | 'dashLength' | 'dashThickness' | 'color' | 'margin' | 'height'>
> = ({ dashLength, dashThickness, dashGap, color, margin, height }) => {
  const itemHeight = dashThickness ?? px(4);
  const itemWidth = dashLength ?? px(1);
  const spacing = dashGap ? dashGap + itemHeight : px(4);
  const dashes = new Array(Math.floor(height! / spacing)).fill(null);
  return (
    <Box marginHorizontal={margin} height={height}>
      <Svg width={itemWidth} height="100%">
        <G>
          {dashes.map((_, index) => (
            <Rect
              key={index}
              x="0"
              y={spacing ? spacing / 2 : 0}
              width={itemWidth}
              height={itemHeight}
              fill={color}
              translateY={spacing * index}
            />
          ))}
        </G>
      </Svg>
    </Box>
  );
};
