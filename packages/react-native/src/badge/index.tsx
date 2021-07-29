import React, { FC } from 'react';
import { TextStyle, View, ViewStyle } from 'react-native';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../theme';
import Flex from '../flex';
import Text from '../text';

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

const DOT_SIZE = 8; // 默认点大小

const Badge: FC<BadgeProps> = ({ type = 'text', containerStyle = {}, textStyle = {}, text, max = 99, children }) => {
  const theme = useTheme<Theme>();

  text = typeof text === 'number' && text > max ? `${max}+` : text;

  const isHidden = () => {
    const isZero = text === '0' || text === 0;
    const isEmpty = text === null || text === undefined || text === '';
    return isEmpty || isZero;
  };

  const contentDom =
    type === 'dot' ? (
      <View
        style={{
          width: DOT_SIZE,
          height: DOT_SIZE,
          borderRadius: DOT_SIZE / 2,
          position: 'absolute',
          top: -(DOT_SIZE / 2),
          right: -(DOT_SIZE / 2),
          backgroundColor: theme.colors.func600,
          ...containerStyle,
        }}
      />
    ) : (
      <View
        style={{
          borderRadius: 12,
          position: 'absolute',
          top: 0,
          right: 0,
          paddingHorizontal: 6,
          backgroundColor: theme.colors.func600,
          justifyContent: 'center',
          ...containerStyle,
        }}
      >
        <Text
          style={{
            color: theme.colors.white,
            textAlign: 'center',
            ...textStyle,
          }}
        >
          {text}
        </Text>
      </View>
    );

  return (
    <Flex>
      <View>
        {children}
        {!isHidden() && contentDom}
      </View>
    </Flex>
  );
};

export default Badge;
