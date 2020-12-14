import React, { FC, ReactElement, useState } from 'react';
import Box from '../box';
import Flex from '../flex';
import { StyleProp, ViewStyle } from 'react-native';
import ButtonItem from './Item';
import { px } from '../helper';
import { useTheme } from '@shopify/restyle';
import { Spacing, Theme } from '../config/theme';
import { IconProps } from '../icon';

interface Option {
  /** 文本或者组件 */
  label: string | ReactElement<IconProps>;
  /** 按下的回调函数 */
  onPress?: () => void;
  /** 自定义样式 */
  style?: StyleProp<ViewStyle>;
}

interface ButtonGroupProps {
  /** 指定可选项 */
  options: Option[];
  /** 尺寸 */
  size?: Spacing;
  /** 设置禁用的项，值为options的数组下标 */
  disabledItems?: number[];
  /** 默认处于点击状态的Item，值为 options 的数组下标 */
  activeIndex?: number;
  /** 自定义Item样式 */
  itemStyle?: StyleProp<ViewStyle>;
  /** 自定义容器样式 */
  containerStyle?: StyleProp<ViewStyle>;
}

const ButtonGroup: FC<ButtonGroupProps> = ({
  disabledItems = [],
  containerStyle,
  options = [],
  activeIndex,
  itemStyle,
  size,
}) => {
  const theme = useTheme<Theme>();
  const [active, setActive] = useState(activeIndex);

  if (options.length === 0) return null;

  return (
    <Box style={[containerStyle]}>
      <Flex flexWrap="wrap">
        {options.map(({ label, onPress, style }, index: number) => {
          const startShapeStyle: ViewStyle =
            index === 0
              ? {
                borderTopStartRadius: theme.borderRadii.base,
                borderBottomStartRadius: theme.borderRadii.base,
                borderLeftWidth: px(1),
              }
              : {};

          const shapeStyle: ViewStyle =
            index === options.length - 1
              ? {
                borderTopEndRadius: theme.borderRadii.base,
                borderBottomEndRadius: theme.borderRadii.base,
                borderWidth: px(1),
                borderLeftWidth: 0,
              }
              : {
                borderWidth: px(1),
                borderLeftWidth: 0,
              };

          return (
            <ButtonItem
              key={index}
              backgroundColor={active === index ? theme.colors.primaryColor : theme.colors.white}
              textColor={active === index ? theme.colors.white : theme.colors.primaryColor}
              disabled={disabledItems.includes(index)}
              label={label}
              size={size}
              style={[shapeStyle, startShapeStyle, itemStyle, style]}
              onPress={() => {
                setActive(index);
                onPress?.();
              }}
            />
          );
        })}
      </Flex>
    </Box>
  );
};

export default ButtonGroup;
