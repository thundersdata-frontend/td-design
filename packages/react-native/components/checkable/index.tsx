import React, { FC, ReactNode, useEffect, useState } from 'react';
import Box from '../box';
import Text from '../text';
import Icon from '../icon';
import { useTheme } from '@shopify/restyle';
import { px } from '../helper';
import { Theme } from '../config/theme';
import Flex from '../flex';
import { StyleProp, View, ViewStyle } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

interface Option {
  label: ReactNode;
  value: string | number;
  disabled?: boolean;
}

interface CustomProps {
  /** 组件类型  */
  type: 'checkbox' | 'radio';
  /** 是否多选  */
  multiple?: boolean;
  /** 指定可选项 */
  options: string[] | number[] | Option[];
  /** 设置禁用  */
  disabled?: boolean;
  /** 默认选项  */
  defaultValue?: string[] | number[];
  /** 自定义样式 */
  style?: StyleProp<ViewStyle>
  /** 点击切换的回调函数  */
  onChange?: (value: string[] | number[]) => void;
}

interface ItemProps {
  /** 组件类型  */
  type: 'checkbox' | 'radio';
  /** 是否多选  */
  multiple?: boolean;
  /** 设置禁用  */
  disabled?: boolean;
  /** 是否指定  */
  checked?: boolean;
  /** 点击切换的回调函数  */
  onChange?: (value: string[] | number[]) => void;
  /** 标题 **/
  title: ReactNode;
  /**  当前值 */
  value: string | number;
  /** 已经选中的值 */
  selectedValue: string[] | number[];
  /** 自定义样式 */
  style?: StyleProp<ViewStyle>
}

const Item: FC<ItemProps> = ({ type, onChange, multiple = true, checked = false, disabled, value, title, selectedValue = [], style }) => {
  const theme = useTheme<Theme>();
  const [selected, setSelected] = useState(checked);

  useEffect(() => {
    setSelected(checked);
  }, [checked])

  const isChecked = multiple ? selected : checked;

  const checkBox =
    <Box
      style={[{
        width: px(14),
        height: px(14),
        borderColor: isChecked && !disabled ? theme.colors.primaryColor : theme.colors.borderColor,
        borderWidth: px(1),
        marginHorizontal: px(1),
      },
      disabled && {
        backgroundColor: theme.colors.disabledBgColor,
      }]}
    >
      {isChecked ?
        <Box style={{ marginRight: px(2), marginTop: -px(2) }}>
          <Icon
            name='check'
            size={px(14)}
            color={disabled ? theme.colors.borderColor : theme.colors.primaryColor}
          />
        </Box> : null}
    </Box>;

  const radio =
    <Box
      style={[
        disabled && {
          borderRadius: px(50),
          backgroundColor: theme.colors.disabledBgColor,
        }]}>
      <Icon
        type={isChecked ? 'ant-design' : 'entypo'}
        name={isChecked ? 'checkcircle' : 'circle'}
        color={isChecked && !disabled ? theme.colors.primaryColor : theme.colors.borderColor}
      />
    </Box>;

  const iconNode =
    <Box style={{ marginHorizontal: px(5) }}>
      {type === 'checkbox' ? checkBox : radio}
    </Box>;

  const handleChange = () => {
    if (disabled) return;

    let data: string[] = selectedValue as string[];
    if (multiple) {
      if (value == 'all') {
        onChange?.([]);
        return
      }
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
  return (
    <View style={[{ marginBottom: 10 }, style ? style : { flex: 1 }]}>
      <TouchableWithoutFeedback onPress={handleChange}>
        <Flex>
          {iconNode}
          {typeof title === "string" ? <Text>{title}</Text> : title}
        </Flex>
      </TouchableWithoutFeedback>
    </View >);
};

const Checkable: FC<CustomProps> = ({
  type,
  options = [],
  multiple = true,
  disabled,
  style,
  defaultValue = [],
  onChange }) => {
  const lastValue = defaultValue.length ? defaultValue[defaultValue.length - 1] : undefined;
  const single = !multiple && lastValue ? [lastValue] as string[] : undefined;
  const [selectedValue, setSelectedValue] = useState<string[] | number[]>(single || defaultValue);
  const [checkedAll, setCheckedAll] = useState<boolean>(false)

  if (options.length) {
    return (
      <Box style={{ marginVertical: px(10) }}>
        <Flex flexWrap='wrap'>
          {
            (multiple && !disabled) &&
            <Item
              style={style}
              multiple={multiple}
              checked={checkedAll}
              type={type}
              value='all'
              title="全选"
              onChange={() => {
                const values = (options as Option[]).map(option => {
                  if (typeof option === 'string' || typeof option === 'number') {
                    return option;
                  } else {
                    return option.value;
                  }
                })

                if (selectedValue.length === values.length) {
                  setCheckedAll(false);
                  setSelectedValue([]);
                  onChange?.([]);
                  return
                }
                setCheckedAll(true);
                setSelectedValue(values as string[]);
                onChange?.(values as string[]);
              }}
              selectedValue={selectedValue}
            />
          }
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
            const handleChange = (values: string[] | number[]) => {
              setSelectedValue(values);
              onChange?.(values);
            };

            return (
              <Item
                key={val}
                style={style}
                multiple={multiple}
                checked={checked}
                type={type}
                value={val}
                title={title}
                disabled={singleDisabled}
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
