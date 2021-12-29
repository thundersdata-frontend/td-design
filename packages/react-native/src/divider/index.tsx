import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '@shopify/restyle';

import Flex from '../flex';
import Text from '../text';
import { Theme, Spacing } from '../theme';
import helpers from '../helpers';

const { px, ONE_PIXEL, deviceWidth } = helpers;
type DividerProps = {
  /** 水平或是垂直 */
  type?: 'vertical' | 'horizontal';
  /** 是否是虚线 */
  isDashed?: boolean;
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
};

const Divider: FC<DividerProps> = props => {
  const theme = useTheme<Theme>();
  const {
    type = 'horizontal',
    margin = 'x1',
    height = px(40),
    color = theme.colors.border,
    text = '',
    textAlign = 'center',
    isDashed = false,
  } = props;

  const DashHorizontalLine = ({ width }: { width?: number | string }) => {
    const len = Math.ceil(deviceWidth / 4);
    const arr = [];
    for (let i = 0; i < len; i++) {
      arr.push(i);
    }
    return (
      <View style={[{ flexDirection: 'row', justifyContent: 'center', overflow: 'hidden', width }]}>
        {arr.map((_, index: number) => {
          return (
            <Text style={{ color: color, fontSize: px(10), marginHorizontal: px(1) }} key={'dash' + index}>
              -
            </Text>
          );
        })}
      </View>
    );
  };

  const DashVerticalLine = () => {
    const len = height / 4;
    const arr = [];
    for (let i = 0; i < len; i++) {
      arr.push(i);
    }
    return (
      <View style={{ flexDirection: 'column', justifyContent: 'center', overflow: 'hidden', paddingHorizontal: px(4) }}>
        {arr.map((_, index) => {
          return (
            <Text
              style={{ height: px(2), width: px(1), backgroundColor: color, marginBottom: px(2) }}
              key={'dash' + index}
            />
          );
        })}
      </View>
    );
  };

  if (!text) {
    if (isDashed) {
      return type === 'horizontal' ? <DashHorizontalLine /> : <DashVerticalLine />;
    }

    return (
      <View
        style={[
          { backgroundColor: color },
          type === 'horizontal'
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
      marginHorizontal: isDashed ? px(2) : px(8),
    },
  });

  const singleWidth = deviceWidth / 8;
  const widthList = {
    'prefix-left': singleWidth,
    'prefix-center': singleWidth * 3,
    'prefix-right': singleWidth * 5,
    'suffix-left': singleWidth * 5,
    'suffix-center': singleWidth * 3,
    'suffix-right': singleWidth * 1,
  };

  return (
    <Flex width="100%">
      {isDashed ? (
        <DashHorizontalLine width={widthList[`prefix-${textAlign}`]} />
      ) : (
        <View style={[styles.line, styles[`prefix-${textAlign}`]]} />
      )}
      <View style={styles.content}>
        <Text variant="p3" color="gray300">
          {text}
        </Text>
      </View>
      {isDashed ? (
        <DashHorizontalLine width={widthList[`suffix-${textAlign}`]} />
      ) : (
        <View style={[styles.line, styles[`suffix-${textAlign}`]]} />
      )}
    </Flex>
  );
};

export default Divider;
