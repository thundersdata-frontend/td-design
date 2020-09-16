import React, { Children, FC, useEffect, useState } from 'react';
import { View, Text, Platform } from 'react-native';
import { backgroundColor, useRestyle, BackgroundColorProps } from '@shopify/restyle';
import { Theme } from '../config/theme';
import { px } from '../helper';

const restyleFunctions = [backgroundColor];

type BadgeProps = BackgroundColorProps<Theme> & {
  /** 徽标内容 */
  text?: string | number;
  /** 展示封顶的数值 */
  overflowCount?: number;
  /** 是否展示为小圆点 */
  dot?: boolean;
  /** text为0时是否显示徽标 */
  showZero?: boolean;
  /** 是否展示为丝带状 */
  ribbon?: boolean;
};

const Badge: FC<BadgeProps> = ({
  backgroundColor = 'dangerousColor',
  text,
  overflowCount = 99,
  dot,
  showZero = false,
  ribbon,
  children,
}) => {
  const [height, setHeight] = useState(px(24));

  useEffect(() => {
    Children.map(children, child => {
      const _child = (child as unknown) as { props: { [key: string]: string | number } };
      if (_child?.props && _child?.props.height) {
        setHeight(+_child?.props.height);
      }
    });
  }, []);

  const dotWidth = height / 6.5;
  const fontSize = height / 5.3 < 12 ? 12 : height / 5.3;
  const padding = Platform.OS === 'ios' ? 6 : 8;

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
          /** 按照等边直角三角形的斜边算法，丝带的宽度大约是根号2即 1.44*height */
          width: 1.44 * height,
          transform: [
            {
              rotate: '45deg',
            },
          ],
          position: 'absolute',
          /** 丝带宽度的四分之一 */
          right: -(0.36 * height),
          /** 0.5的height - 丝带的高度（即字体的行高） */
          top: height / 2 - 1.4 * fontSize,
        }
      : {
          borderRadius: fontSize,
          position: 'absolute',
          /** 圈圈的高度为字体的行高，那top就是二分之一圈圈的高度 */
          top: -(0.7 * fontSize),
          /** 每个字大约占12宽度，right = 全部字的宽度/2 + 左内边距 */
          right: -(`${text}`.split('').length * 6 + padding),
          paddingHorizontal: padding,
        },
  });

  const contentDom = dot ? (
    <View {...dotProps} />
  ) : (
    <View {...props}>
      <Text style={{ color: 'white', textAlign: 'center', fontSize, lineHeight: 1.4 * fontSize }}>{text}</Text>
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
