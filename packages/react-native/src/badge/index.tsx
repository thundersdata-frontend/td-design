import React, { FC } from 'react';
import { TextStyle, View, ViewStyle } from 'react-native';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../theme';
import helpers from '../helpers';
import Flex from '../flex';
import Text from '../text';

const { isIOS } = helpers;

type BadgeProps = {
  /** 徽标内容 */
  text?: string | number;
  /** 展示封顶的数值 */
  overflowCount?: number;
  /** badge的形态，小圆点 | 文字 */
  type?: 'dot' | 'text';
  /** badge的容器的style */
  viewStyle?: ViewStyle;
  /** badge中文字的style */
  textStyle?: TextStyle;
};

const Badge: FC<BadgeProps> = ({
  type = 'text',
  viewStyle = {},
  textStyle = {},
  text,
  overflowCount = 99,
  children,
}) => {
  const theme = useTheme<Theme>();

  text = typeof text === 'number' && text > overflowCount ? `${overflowCount}+` : text;

  const isHidden = () => {
    const isZero = text === '0' || text === 0;
    const isEmpty = text === null || text === undefined || text === '';
    return isEmpty || isZero;
  };

  const contentDom =
    type === 'dot' ? (
      <View
        style={{
          width: 8,
          height: 8,
          borderRadius: 4,
          position: 'absolute',
          top: -4,
          right: -4,
          backgroundColor: theme.colors.func600,
          ...viewStyle,
        }}
      />
    ) : (
      <View
        style={{
          borderRadius: 12,
          position: 'absolute',
          top: 0,
          right: 0,
          paddingHorizontal: isIOS ? 6 : 8,
          backgroundColor: theme.colors.func600,
          justifyContent: 'center',
          ...viewStyle,
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
