import React, { FC, ReactNode, useState } from 'react';
import Box from '../box';
import { ListItem, Theme } from '..';
import Icon from '../icon';
import { useTheme } from '@shopify/restyle';
import { px } from '../helper';

interface Option {
  label: ReactNode;
  value: string | number;
  disabled?: boolean;
}

interface CustomProps {
  /** 组件类型  */
  type: 'checkbox' | 'radio';
  /** 指定可选项 */
  options: string[] | number[] | Option[];
  /** 设置禁用  */
  disabled?: boolean;
  /** 默认选项  */
  defaultValue?: string[] | number[];
  /** 点击切换的回调函数  */
  onChange?: (value: string[] | number[]) => void;
}

interface ItemProps {
  /** 组件类型  */
  type: 'checkbox' | 'radio';
  /** 设置禁用  */
  disabled?: boolean;
  /** 是否指定  */
  checked?: boolean;
  /** 点击切换的回调函数  */
  onChange?: (value: string[] | number[]) => void;
  title: ReactNode;
  value: string | number;
  selectedValue: string[] | number[];
}

const Item: FC<ItemProps> = ({ type, onChange, checked = false, disabled, value, title, selectedValue = [] }) => {
  const theme = useTheme<Theme>();
  const [selected, setSelected] = useState(checked);

  const isChecked = type === 'checkbox' ? selected : checked;

  let thumbNode =
    <Box style={[{ marginRight: px(10) }, disabled && { borderRadius: px(50), backgroundColor: theme.colors.disabledBgColor }]}>
      {
        isChecked ?
          <Icon
            name='checkcircle'
            color={disabled ? theme.colors.borderColor : theme.colors.primaryColor}
            disabled={disabled}
          /> :
          <Icon
            type='entypo'
            name='circle'
            color={theme.colors.borderColor}
            disabled={disabled}
          />
      }
    </Box>;

  const onHandleChange = () => {
    let data: string[] = selectedValue as string[];
    if (type === 'checkbox') {
      setSelected(!selected)
      if (selectedValue.includes(value as never)) {
        data = (selectedValue as string[]).filter(item => item !== value);
      } else {
        data.push(value as string)
      }
    } else {
      if (selectedValue.length && selectedValue[0] === value) {
        data = []
      } else {
        data = [value as string]
      }
    }
    onChange?.(data);
  };
  return <ListItem onPress={disabled ? undefined : onHandleChange} title={title} thumb={thumbNode} />;
};

const Checkable: FC<CustomProps> = ({ type, options = [], disabled, defaultValue = [], onChange }) => {
  const lastValue = defaultValue.length ? defaultValue[defaultValue.length - 1] : undefined;
  const radioDefault = type === "radio" && lastValue ? [lastValue] as string[] : undefined;
  const [selectedValue, setSelectedValue] = useState<string[] | number[]>(radioDefault || defaultValue);

  if (options.length) {
    return (
      <Box>
        {(options as Option[]).map(option => {
          let title: ReactNode = '';
          let val = '';
          let singleDisabled = disabled;
          if (typeof option === 'string' || typeof option === 'number') {
            val = option as string;
            title = '' + option;
          } else {
            val = option.value as string;
            title = option.label;
            singleDisabled = option.disabled || disabled;
          }

          let checked = (selectedValue as string[]).includes(val);

          const onHandleChange = (values: string[] | number[]) => {
            setSelectedValue(values);
            onChange?.(values);
          };

          return (
            <Item
              key={val}
              checked={checked}
              type={type}
              value={val}
              title={title}
              disabled={singleDisabled}
              onChange={onHandleChange}
              selectedValue={selectedValue}
            />
          );
        })}
      </Box>
    );
  }
  return <Box />;
};

export default Checkable;
