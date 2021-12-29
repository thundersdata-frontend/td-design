import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '@shopify/restyle';

import Flex from '../flex';
import Text from '../text';
import { Theme, Spacing } from '../theme';
import helpers from '../helpers';

const { px, ONE_PIXEL } = helpers;
type DividerProps = {
  /** 水平或是垂直 */
  type?: 'vertical' | 'horizontal';
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
  } = props;

  if (!text) {
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
      marginHorizontal: 8,
    },
  });
  return (
    <Flex>
      <View style={[styles.line, styles[`prefix-${textAlign}`]]} />
      <View style={styles.content}>
        <Text variant="p3" color="gray300">
          {text}
        </Text>
      </View>
      <View style={[styles.line, styles[`suffix-${textAlign}`]]} />
    </Flex>
  );
};

export default Divider;
