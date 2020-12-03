import React, { FC, ReactNode, ReactText, useEffect, useState } from 'react';
import Box from '../box';
import Text from '../text';
import Icon from '../icon';
import { useTheme } from '@shopify/restyle';
import { px } from '../helper';
import { Theme } from '../config/theme';
import Flex from '../flex';
import { StyleProp, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
interface Option {
  label: ReactNode;
  value: ReactText;
}
interface CheckableProps {
  /** 组件类型  */
  type: 'checkbox' | 'radio';
  /** 是否多选  */
  multiple?: boolean;
  /** 指定可选项 */
  options: ReactText[] | Option[];
  /** 设置禁用的项  */
  disabledValue?: ReactText[];
  /** 指定值  */
  value?: ReactText[];
  /** 默认选项  */
  defaultValue?: ReactText[];
  /** 自定义文本样式 */
  labelStyle?: StyleProp<TextStyle>;
  /** 自定义Item样式 */
  itemStyle?: StyleProp<ViewStyle>;
  /** 自定义容器样式 */
  containerStyle?: StyleProp<ViewStyle>;
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
  onChange: (value: ReactText) => void;
  /** 标题 **/
  title: ReactNode;
  /**  当前值 */
  value: ReactText;
  /** 自定义文本样式 */
  labelStyle?: StyleProp<TextStyle>;
  /** 自定义item样式 */
  itemStyle?: StyleProp<ViewStyle>;
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
  /** 自定义文本样式 */
  labelStyle?: StyleProp<TextStyle>;
}

const Shape: FC<ShapeProps> = ({ checked = false, disabled = false, type, title, labelStyle }) => {
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
      {typeof title === "string" ? <Text style={labelStyle}>{title}</Text> : title}
    </Flex>);
}

const Item: FC<ItemProps> = ({ onChange, multiple = true, disabled = false, value, itemStyle, ...shapeProps }) => {
  const handleChange = () => {
    if (disabled) return;
    onChange(value);
  };

  return (
    <TouchableOpacity
      onPress={handleChange}
      activeOpacity={0.89}
      style={[itemStyle]}
    >
      <Shape {...shapeProps} disabled={disabled} />
    </TouchableOpacity>
  );
};

const Checkable: FC<CheckableProps> = ({
  multiple = true,
  disabledValue = [],
  containerStyle,
  value = [],
  options = [],
  defaultValue = [],
  onChange,
  ...restProps
}) => {
  const [selectedValue, setSelectedValue] = useState<ReactText[]>(multiple ? defaultValue : [defaultValue[0]]);

  useEffect(() => {
    if (value.length === 0) return;
    if (!multiple) {
      setSelectedValue([value[0]]);
    } else {
      setSelectedValue(value => {
        if (value.length === options.length) {
          value.push('all')
        }
        return value
      });
    }
  }, [value.toString()]);

  if (options.length === 0) return null;

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

  const handleChange = (value: ReactText) => {
    let _value = selectedValue.slice();
    if (selectedValue.includes(value)) {
      if (value === 'all') {
        _value = [];
      } else {
        const index = _value.indexOf(value);
        _value.splice(index, 1);
      }
      // 如果有一个没有选中，取消全选
      if (_value.includes('all')) {
        _value.splice(_value.indexOf('all'), 1);
      }
    } else {
      if (!multiple) {
        _value.pop();
      }
      if (value === 'all') {
        _value = optionData.filter(option => !disabledValue.includes(option.value)).map(option => option.value);
      }
      _value.push(value);

      // 如果勾选到了所有选项，默认选中全选
      if (_value.length === options.length) {
        _value.push('all');
      }
    }
    setSelectedValue(_value);
    onChange?.(_value.filter(item => item !== 'all'));
  }

  return (
    <Box marginVertical='s' style={containerStyle}>
      <Flex flexWrap='wrap'>
        {
          multiple && !disabledValue.length &&
          < Item
            {...restProps}
            multiple={multiple}
            checked={selectedValue.includes('all')}
            value='all'
            title="全选"
            onChange={() => handleChange('all')}
          />
        }
        {optionData.map(({ label, value }) => {
          return (
            <Item
              {...restProps}
              key={value}
              multiple={multiple}
              checked={selectedValue.includes(value)}
              value={value}
              title={label}
              disabled={disabledValue.includes(value)}
              onChange={handleChange}
            />
          );
        })}
      </Flex>
    </Box>
  );
};

export default Checkable;
