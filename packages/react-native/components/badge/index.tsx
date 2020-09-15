import React, { FC } from 'react';
import { View, Text, Platform } from 'react-native';
import { backgroundColor, useRestyle, BackgroundColorProps } from '@shopify/restyle';
import { Theme } from '../config/theme';

const restyleFunctions = [backgroundColor];

type BadgeProps = BackgroundColorProps<Theme> & {
  size?: 'large' | 'small'; // dot的大小
  text?: string | number; // 徽标内容
  overflowCount?: number; // 展示封顶的数值
  dot?: boolean; // 是否展示为小圆点
  showZero?: boolean; // text为0时是否显示徽标
  ribbon?: boolean; // 是否展示为丝带状
};

const Badge: FC<BadgeProps> = ({
  size = 'small',
  backgroundColor = 'dangerousColor',
  text,
  overflowCount = 99,
  dot,
  showZero = false,
  ribbon,
  children,
}) => {
  const dotWidth = size === 'small' ? 8 : 12;

  text = typeof text === 'number' && text > overflowCount ? `${overflowCount}+` : text;

  const isHidden = () => {
    const isZero = text === '0' || text === 0;
    const isEmpty = text === null || text === undefined || text === '';
    return (isEmpty || (isZero && !showZero)) && !dot;
  };

  const dotProps = useRestyle(restyleFunctions, {
    backgroundColor,
    style: {
      width: dotWidth,
      height: dotWidth,
      borderRadius: dotWidth / 2,
      position: 'absolute',
      top: -(dotWidth / 2),
      right: -(dotWidth / 2),
    },
  });

  const props = useRestyle(restyleFunctions, {
    backgroundColor,
    style: ribbon
      ? {
          width: 72,
          transform: [
            {
              rotate: '45deg',
            },
          ],
          position: 'absolute',
          top: 8,
        }
      : {
          borderRadius: 12,
          position: 'absolute',
          top: -10,
          right: -15,
          paddingVertical: 2,
          paddingHorizontal: Platform.OS === 'ios' ? 6 : 8,
        },
  });

  const contentDom = dot ? (
    <View {...dotProps} />
  ) : (
    <View {...props}>
      <Text style={{ color: 'white', textAlign: 'center' }}>{text}</Text>
    </View>
  );

  return (
    <View style={{ flexDirection: 'row' }}>
      <View style={ribbon && { overflow: 'hidden' }}>
        {children}
        {!isHidden() && contentDom}
      </View>
    </View>
  );
};

export default Badge;
