import React, { FC, ReactNode, ReactText, useEffect, useState } from 'react';
import Box from '../box';
import Text from '../text';
import Icon from '../icon';
import { useTheme } from '@shopify/restyle';
import { px } from '../helper';
import { Theme } from '../config/theme';
import Flex from '../flex';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';

interface Option {
  label: ReactNode;
  value: ReactText;
  disabled?: boolean;
}

interface CheckableProps {
  /** 组件类型  */
  type: 'checkbox' | 'radio';
  /** 是否多选  */
  multiple?: boolean;
  /** 指定可选项 */
  options: ReactText[] | Option[];
  /** 设置禁用  */
  disabled?: boolean;
  /** 指定值  */
  value?: ReactText[];
  /** 默认选项  */
  defaultValue?: ReactText[];
  /** 自定义样式 */
  itemStyle?: StyleProp<ViewStyle>
  /** 点击切换的回调函数  */
  onChange?: (value: ReactText[]) => void;
}

interface ItemProps {
  /** 组件类型  */
  type: 'checkbox' | 'radio';
  /** 是否多选  */
  multiple?: boolean;
  /** 设置禁用  */
  disabled?: boolean;
  /** 是否选中  */
  checked?: boolean;
  /** 点击切换的回调函数  */
  onChange?: (value: ReactText[]) => void;
  /** 标题 **/
  title: ReactNode;
  /**  当前值 */
  value: ReactText;
  /** 已经选中的值 */
  selectedValue: ReactText[];
  /** 自定义样式 */
  style?: StyleProp<ViewStyle>;
}

interface ShapeProps {
  /** 组件类型  */
  type: 'checkbox' | 'radio';
  /** 是否选中  */
  checked?: boolean;
  /** 设置禁用  */
  disabled?: boolean;
  /** 标题 **/
  title: ReactNode;
}

const Shape: FC<ShapeProps> = ({ checked = false, disabled = false, type, title }) => {
  const theme = useTheme<Theme>();

  /** checkbox类型 */
  const checkBox =
    <Box
      style={[{
        width: px(14),
        height: px(14),
        borderColor: checked && !disabled ? theme.colors.primaryColor : theme.colors.borderColor,
        borderWidth: px(1),
        marginHorizontal: px(1),
      },
      disabled && {
        backgroundColor: theme.colors.disabledBgColor,
      }]}
    >
      {checked ?
        <Box style={{ marginRight: px(2), marginTop: -px(2) }}>
          <Icon
            name='check'
            size={px(14)}
            color={disabled ? theme.colors.borderColor : theme.colors.primaryColor}
          />
        </Box> : null}
    </Box>;

  /** radio类型 */
  const radio =
    <Box
      style={[
        disabled && {
          borderRadius: px(50),
          backgroundColor: theme.colors.disabledBgColor,
        }]}>
      <Icon
        type={checked ? 'ant-design' : 'entypo'}
        name={checked ? 'checkcircle' : 'circle'}
        color={checked && !disabled ? theme.colors.primaryColor : theme.colors.borderColor}
      />
    </Box>;

  return (
    <Flex>
      <Box marginHorizontal='xs'>{type === 'checkbox' ? checkBox : radio}</Box>
      {typeof title === "string" ? <Text>{title}</Text> : title}
    </Flex>);
}

const Item: FC<ItemProps> = ({ onChange, multiple = true, disabled = false, value, selectedValue = [], style, ...shapeProps }) => {
  const handleChange = () => {
    if (disabled) return;
    let data: ReactText[] = selectedValue;
    if (multiple) {
      if (value == 'all') {
        onChange?.([]);
        return
      }
      if (selectedValue.includes(value as never)) {
        data = (selectedValue).filter(item => item !== value);
      } else {
        data.push(value)
      }
    } else {
      if (selectedValue.length && selectedValue[0] === value) {
        data = []
      } else {
        data = [value]
      }
    }
    onChange?.(data);
  };
  return (
    <TouchableOpacity
      onPress={handleChange}
      activeOpacity={0.89}
      style={[{ marginBottom: 10 }, style]}
    >
      <Shape {...shapeProps} disabled={disabled} />
    </TouchableOpacity>
  );
};

const Checkable: FC<CheckableProps> = ({
  type,
  multiple = true,
  disabled,
  itemStyle,
  value = [],
  options = [],
  defaultValue = [],
  onChange }) => {

  if (!multiple && defaultValue.length) {
    defaultValue.splice(0, defaultValue.length - 1)
  }

  const [selectedValue, setSelectedValue] = useState<ReactText[]>(defaultValue);
  const [checkedAll, setCheckedAll] = useState<boolean>(false);

  useEffect(() => {
    if (!multiple && value.length) {
      value.splice(0, value.length - 1)
    }
    if (value && value.length) {
      setSelectedValue(value)
    }
  }, [value.toString()]);

  if (options.length) {
    const optionData = (options as Option[]).map(option => {
      if (typeof option === 'string') {
        return {
          label: option,
          value: option,
          disabled: false,
        }
      }
      if (typeof option === 'number') {
        return {
          label: '' + option,
          value: option,
          disabled: false,
        }
      }
      return option
    });

    const allValues = optionData.filter(option => !option.disabled).map(option => option.value);

    return (
      <Box marginVertical='s'>
        <Flex flexWrap='wrap'>
          {
            (multiple && !disabled) &&
            <Item
              style={itemStyle}
              type={type}
              multiple={multiple}
              checked={checkedAll}
              value='all'
              title="全选"
              selectedValue={selectedValue}
              onChange={() => {
                if (JSON.stringify(allValues.sort()) === JSON.stringify(selectedValue.sort())) {
                  setCheckedAll(false);
                  setSelectedValue([]);
                  onChange?.([]);
                  return
                }
                setCheckedAll(true);
                setSelectedValue(allValues);
                onChange?.(allValues);
              }}
            />
          }
          {optionData.map(option => {
            let checked = selectedValue.includes(option.value as never);
            const handleChange = (values: ReactText[]) => {
              // 如果已经选择全部就把全选勾上
              if (JSON.stringify(allValues.sort()) === JSON.stringify(selectedValue.sort())) {
                setCheckedAll(true);
              }
              setSelectedValue([...values]);
              onChange?.(values);
            };

            return (
              <Item
                key={option.value}
                style={itemStyle}
                multiple={multiple}
                checked={checked}
                type={type}
                value={option.value}
                title={option.label}
                disabled={disabled || option.disabled}
                onChange={handleChange}
                selectedValue={selectedValue}
              />
            );
          })}
        </Flex>
      </Box>
    );
  }
  return null;
};

export default Checkable;
