import React, { FC, ReactNode, ReactText, useEffect, useState } from 'react';
import { StyleProp, TextStyle, TouchableOpacity, ViewStyle, Keyboard } from 'react-native';
import Box from '../box';
import Text from '../text';
import SvgIcon from '../svg-icon';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../theme';
import Flex from '../flex';

interface Option {
  label: ReactNode;
  value: ReactText;
}
type CheckableProps = Pick<ItemProps, 'size' | 'type' | 'labelStyle' | 'disabled' | 'itemStyle'> & {
  /** 值 */
  value?: ReactText[];
  /** 事件回调 */
  onChange?: (value: ReactText[]) => void;
  /** 指定可选项 */
  options: ReactText[] | Option[];
  /** 设置禁用的项  */
  disabledValue?: ReactText[];
  /** 默认选项  */
  defaultValue?: ReactText[];
  /** 自定义容器样式 */
  containerStyle?: StyleProp<ViewStyle>;
  /** 是否显示全选 */
  showSelectAll?: boolean;
};
type ItemProps = ShapeProps & {
  /** 设置禁用  */
  disabled?: boolean;
  /** 点击切换的回调函数  */
  onChange: (value: ReactText) => void;
  /**  当前值 */
  value: ReactText;
  /** 自定义item样式 */
  itemStyle?: StyleProp<ViewStyle>;
};
interface ShapeProps {
  /** 设置禁用  */
  disabled?: boolean;
  /** 图标大小 */
  size?: number;
  /** 组件类型  */
  type: 'checkbox' | 'radio';
  /** 是否选中  */
  checked?: boolean;
  /** 标题 **/
  label: ReactNode;
  /** 自定义文本样式 */
  labelStyle?: StyleProp<TextStyle>;
}

const Shape: FC<ShapeProps> = ({ checked = false, disabled = false, type, label, labelStyle }) => {
  const theme = useTheme<Theme>();

  let color = checked ? theme.colors.primary200 : theme.colors.icon;
  if (disabled) {
    color = theme.colors.disabled;
  }

  /** checkbox类型 */
  const checkBox = <SvgIcon name={checked ? 'checkcircle' : 'radio-unchecked'} color={color} />;

  /** radio类型 */
  const radio = <SvgIcon name={checked ? 'radio-checked' : 'radio-unchecked'} color={color} />;

  return (
    <Flex marginRight="x2">
      <Box marginRight="x1">{type === 'checkbox' ? checkBox : radio}</Box>
      {typeof label === 'string' ? (
        <Text variant="p0" color={disabled ? 'disabled' : 'gray500'} style={labelStyle}>
          {label}
        </Text>
      ) : (
        label
      )}
    </Flex>
  );
};

const Item: FC<ItemProps> = ({ onChange, disabled = false, value, itemStyle, ...shapeProps }) => {
  const handleChange = () => {
    Keyboard.dismiss();
    if (disabled) return;
    onChange(value);
  };

  return (
    <TouchableOpacity onPress={handleChange} activeOpacity={disabled ? 1 : 0.5} style={[itemStyle]}>
      <Shape {...shapeProps} disabled={disabled} />
    </TouchableOpacity>
  );
};

const Checkable: FC<CheckableProps> = ({
  type,
  disabledValue = [],
  containerStyle,
  value = [],
  options = [],
  defaultValue = [],
  onChange,
  showSelectAll = false,
  ...restProps
}) => {
  const [selectedValue, setSelectedValue] = useState<ReactText[]>(defaultValue);

  useEffect(() => {
    if (value.length > 0) {
      setSelectedValue(value => {
        if (value.length === options.length) {
          value.push('all');
        }
        return value;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value.toString()]);

  if (options.length === 0) return null;

  const optionData = (options as Option[]).map(option => {
    if (typeof option === 'string') {
      return {
        label: option,
        value: option,
      };
    }
    if (typeof option === 'number') {
      return {
        label: '' + option,
        value: option,
      };
    }
    return option;
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
      if (type === 'radio') {
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
  };

  return (
    <Box marginVertical="x2" style={containerStyle}>
      <Flex flexWrap="wrap">
        {type === 'checkbox' && !disabledValue.length && showSelectAll && (
          <Item
            {...restProps}
            type={type}
            checked={selectedValue.includes('all')}
            value="all"
            label="全选"
            onChange={() => handleChange('all')}
          />
        )}
        {optionData.map(({ label, value }) => {
          return (
            <Item
              {...restProps}
              type={type}
              key={value}
              checked={selectedValue.includes(value)}
              value={value}
              label={label}
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
