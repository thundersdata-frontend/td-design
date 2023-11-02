import React, { cloneElement, FC, memo, ReactElement } from 'react';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

import Box from '../box';
import Text from '../text';
import useBadge from './useBadge';

const DOT_SIZE = 8; // 默认点大小
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

const Badge: FC<BadgeProps> = ({
  type = 'text',
  containerStyle = {},
  textStyle = {},
  text,
  max = 99,
  children,
}: BadgeProps) => {
  const { onBadgeLayout, badgeOffset, layout } = useBadge();

  return (
    <Box width={layout.width} height={layout.height}>
      {cloneElement(children, {
        onLayout: onBadgeLayout,
      })}
      <Content {...{ type, text, max, containerStyle, textStyle, badgeOffset }} />
    </Box>
  );
};
Badge.displayName = 'Badge';

export default Badge;

const Content = memo(
  ({
    type,
    text,
    max,
    containerStyle,
    textStyle,
    badgeOffset,
  }: Pick<BadgeProps, 'type' | 'text' | 'max' | 'containerStyle' | 'textStyle'> & {
    badgeOffset: { top: number; right: number };
  }) => {
    text = typeof text === 'number' && text > max! ? `${max}+` : text;

    const isZero = text === '0' || text === 0;
    const isEmpty = text === null || text === undefined || text === '';
    const isHidden = isEmpty || isZero;

    if (isHidden) return null;

    if (type === 'dot')
      return (
        <Box
          width={DOT_SIZE}
          height={DOT_SIZE}
          position={'absolute'}
          top={-(DOT_SIZE / 2)}
          right={-(DOT_SIZE / 2)}
          backgroundColor={'func600'}
          style={StyleSheet.compose(
            {
              borderRadius: DOT_SIZE / 2,
            },
            containerStyle
          )}
        />
      );
    return (
      <Box
        borderRadius={'x1'}
        position={'absolute'}
        top={badgeOffset.top}
        right={badgeOffset.right}
        paddingHorizontal={'x1'}
        backgroundColor={'func600'}
        justifyContent={'center'}
        style={containerStyle}
      >
        <Text textAlign={'center'} color="white" style={textStyle}>
          {text}
        </Text>
      </Box>
    );
  }
);
