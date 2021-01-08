import React, { Children, FC, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { backgroundColor, useRestyle, BackgroundColorProps } from '@shopify/restyle';
import { Theme } from '../config/theme';
import { px, isIOS } from '../helper';

const restyleFunctions = [backgroundColor];

type BadgeProps = BackgroundColorProps<Theme> & {
  /** 徽标内容 */
  text?: string | number;
  /** 展示封顶的数值 */
  overflowCount?: number;
  /** badge的形态，小圆点 | 丝带状 | 文字 */
  type?: 'dot' | 'ribbon' | 'text';
};

// 计算badge的基础数值
const BASE_HEIGHT = px(24);

const Badge: FC<BadgeProps> = ({
  type = 'text',
  backgroundColor = 'dangerousColor',
  text,
  overflowCount = 99,
  children,
}) => {
  const [base, setBase] = useState(BASE_HEIGHT);

  useEffect(() => {
    Children.map(children, child => {
      const _child = (child as unknown) as { props: { [key: string]: string | number } };
      const height = _child?.props.height && !Number.isNaN(+_child?.props.height) ? +_child?.props.height : BASE_HEIGHT;
      const width = _child?.props.width && !Number.isNaN(+_child?.props.width) ? +_child?.props.width : BASE_HEIGHT;
      setBase(Math.min(width, height));
    });
  }, [base, children]);

  useEffect(() => {
    /** 当计算出来的base小于px(44)时，不显示ribbon，并报错 */
    if (type === 'ribbon' && base !== BASE_HEIGHT && base < px(44)) {
      throw new Error('Badge组件：请不要在children的宽高小于px(44)的情况下使用ribbon');
    }
  }, [type, base]);

  const dotWidth = base / 6.5;
  const fontSize = base / 5.3 < 12 ? 12 : base / 5.3;
  const padding = isIOS ? 6 : 8;

  text = typeof text === 'number' && text > overflowCount ? `${overflowCount}+` : text;

  const isHidden = () => {
    const isZero = text === '0' || text === 0;
    const isEmpty = text === null || text === undefined || text === '';
    return isEmpty || isZero;
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
    style:
      type === 'ribbon' && base > px(43)
        ? {
            /** 按照等腰直角三角形的斜边算法，丝带的宽度大约是根号2即 1.44*height */
            width: 1.44 * base,
            transform: [
              {
                rotate: '45deg',
              },
            ],
            position: 'absolute',
            /** 丝带宽度的四分之一 */
            right: -(0.36 * base),
            /** 0.5的height - 丝带的高度（即字体的行高） */
            top: base / 2 - 1.4 * fontSize,
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

  const contentDom =
    type === 'dot' ? (
      <View {...dotProps} />
    ) : (
      <View {...props}>
        <Text style={{ color: 'white', textAlign: 'center', fontSize, lineHeight: 1.4 * fontSize }}>{text}</Text>
      </View>
    );

  return (
    <View style={{ flexDirection: 'row' }}>
      <View
        style={[type === 'ribbon' && base > px(43) && { overflow: 'hidden' }, type !== 'dot' && { minWidth: px(30) }]}
      >
        {children}
        {!isHidden() && contentDom}
      </View>
    </View>
  );
};

export default Badge;
