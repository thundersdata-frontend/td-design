import React, { FC, ReactNode, useState } from 'react';
import Box from '../box';
import Flex from '../flex';
import { StyleProp, ViewStyle } from 'react-native';
import ButtonItem, { SIZE_TYPE } from './Item';
import { px } from '../helper';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../config/theme';

interface Option {
  /** 文本或者组件 */
  label: ReactNode;
  /** 按下的回调函数 */
  onPress?: () => void;
  /** 自定义样式 */
  style?: StyleProp<ViewStyle>;
}

interface ButtonGroupProps {
  /** 指定可选项 */
  options: Option[];
  /** 尺寸 */
  size?: SIZE_TYPE;
  /** 设置禁用的项 */
  disabledItems?: number[];
  /** 默认处于点击状态的Item */
  activeIndex?: number;
  /** 自定义Item样式 */
  itemStyle?: StyleProp<ViewStyle>;
  /** 自定义容器样式 */
  containerStyle?: StyleProp<ViewStyle>;
  /** 选中时的按钮的背景颜色 */
  activeBgColor?: string,
  /** 未选中时的按钮的背景颜色 */
  inactiveBgColor?: string,
  /** 选中时的按钮的文本颜色 */
  activeTextColor?: string,
  /** 未选中时的按钮的文本颜色 */
  inactiveTextColor?: string,
}

const ButtonGroup: FC<ButtonGroupProps> = ({
  disabledItems = [],
  containerStyle,
  options = [],
  activeIndex,
  activeBgColor,
  inactiveBgColor,
  activeTextColor,
  inactiveTextColor,
  itemStyle,
  size,
}) => {

  const theme = useTheme<Theme>();
  const [active, setActive] = useState(activeIndex)

  if (options.length === 0) return null;

  return (
    <Box style={containerStyle}>
      <Flex flexWrap='wrap'>
        {options.map(({ label, onPress, style }, index: number) => {
          const startShapeStyle: ViewStyle = index === 0 ? {
            borderTopStartRadius: theme.borderRadii.base,
            borderBottomStartRadius: theme.borderRadii.base,
          } : {};

          const shapeStyle: ViewStyle = index === options.length - 1 ? {
            borderTopEndRadius: theme.borderRadii.base,
            borderBottomEndRadius: theme.borderRadii.base,
          } : { borderRightWidth: px(1), borderColor: theme.colors.borderColor };

          return (
            <ButtonItem
              key={index}
              backgroundColor={active === index ? activeBgColor : inactiveBgColor}
              textColor={active === index ? activeTextColor : inactiveTextColor}
              disabled={disabledItems.includes(index)}
              label={label}
              size={size}
              style={[
                startShapeStyle,
                shapeStyle,
                itemStyle,
                style,
              ]}
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
