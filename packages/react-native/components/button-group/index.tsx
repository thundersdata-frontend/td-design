import React, { FC, ReactNode, ReactText, useState } from 'react';
import Box from '../box';
import Flex from '../flex';
import { StyleProp, ViewStyle } from 'react-native';
import ButtonItem from './Item';
import { px } from '../helper';

export type SIZE_TYPE = 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';

const DEFAULT_BUTTON_RADIUS = px(5);

interface Option {
  /** 文本或者组件 */
  label: ReactNode;
  /** 值 */
  value: ReactText;
  /** 自定义样式 */
  style?: StyleProp<ViewStyle>;
}

interface ButtonGroupProps {
  /** 指定可选项 */
  options: ReactText[] | Option[];
  /** 是否多选  */
  multiple?: boolean;
  /** 尺寸 */
  size?: SIZE_TYPE;
  /** 设置禁用的项  */
  disabledValue?: ReactText[];
  /** 默认选项  */
  defaultChecked?: ReactText[];
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
  /** 点击切换的回调函数  */
  onChange?: (value: ReactText[]) => void;
}

const ButtonGroup: FC<ButtonGroupProps> = ({
  disabledValue = [],
  containerStyle,
  options = [],
  defaultChecked = [],
  activeBgColor,
  inactiveBgColor,
  activeTextColor,
  inactiveTextColor,
  itemStyle,
  multiple = false,
  size,
  onChange,
}) => {
  if (options.length === 0) return null;

  const [selectedValue, setSelectedValue] = useState(defaultChecked)

  const handleChange = (value: ReactText) => {
    let _value = selectedValue.slice();
    if (selectedValue.includes(value)) {
      if (value === 'all') {
        _value = [];
      } else {
        const index = _value.indexOf(value);
        _value.splice(index, 1);
      }
    } else {
      if (!multiple) {
        _value.pop();
      }
      _value.push(value);
    }
    setSelectedValue(_value);
    onChange?.(_value);
  }

  const optionData = (options as Option[]).map(option => {
    if (typeof option === 'string') {
      return {
        label: option,
        value: option,
      }
    }
    if (typeof option === 'number') {
      return {
        label: '' + option,
        value: option,
      }
    }
    return option
  });

  const isFirstElement = (value: ReactText): boolean => {
    return optionData.map(item => item.value).indexOf(value) === 0
  };

  const isLastElement = (value: ReactText): boolean => {
    return optionData.map(item => item.value).indexOf(value) === optionData.length - 1;
  };

  return (
    <Box style={containerStyle}>
      <Flex flexWrap='wrap'>
        {optionData.map(({ label, value, style }) => {
          const startShapeStyle: ViewStyle = isFirstElement(value) ? {
            borderTopStartRadius: DEFAULT_BUTTON_RADIUS,
            borderBottomStartRadius: DEFAULT_BUTTON_RADIUS,
          } : {};

          const endShapeStyle: ViewStyle = isLastElement(value) ? {
            borderTopEndRadius: DEFAULT_BUTTON_RADIUS,
            borderBottomEndRadius: DEFAULT_BUTTON_RADIUS,
          } : {};

          return (
            <ButtonItem
              key={value}
              backgroundColor={selectedValue.includes(value) ? activeBgColor : inactiveBgColor}
              textColor={selectedValue.includes(value) ? activeTextColor : inactiveTextColor}
              disabled={disabledValue.includes(value)}
              label={label}
              value={value}
              size={size}
              style={[startShapeStyle, endShapeStyle, itemStyle, style]}
              onPress={() => handleChange(value)}
            />
          );
        })}
      </Flex>
    </Box>
  );
};

export default ButtonGroup;
