import React, { forwardRef, ReactNode, useEffect, useState } from 'react';
import { useTheme } from '@shopify/restyle';
import { TextInput, TextInputProps, TouchableOpacity } from 'react-native';
import { Theme } from '../config/theme';
import Text from '../text';
import Flex from '../flex';
import Box from '../box';
import Icon from '../icon';
import { ONE_PIXEL, px } from '../helper';

export interface InputItemProps extends Omit<TextInputProps, 'placeholderTextColor' | 'onChange' | 'onChangeText'> {
  /** 标签 */
  label?: ReactNode;
  /** 输入类型。文本输入或者密码输入 */
  inputType?: 'input' | 'password';
  /** 右侧内容 */
  extra?: ReactNode;
  /** 是否显示清除图标 */
  allowClear?: boolean;
  /** 值 */
  value?: string;
  /** 输入改变事件 */
  onChange?: (value: string) => void;
  /** 是否必填项 */
  required?: boolean;
  /** 是否显示冒号 */
  colon?: boolean;
  onClear?: () => void;
}
const InputItem = forwardRef<TextInput, InputItemProps>(
  (
    {
      label,
      extra,
      inputType = 'input',
      allowClear = true,
      value,
      onChange,
      onClear,
      required = false,
      style,
      colon = false,
      ...restProps
    },
    ref
  ) => {
    const theme = useTheme<Theme>();
    const [inputValue, setInputValue] = useState(value);
    const [eyeOpen, setEyeOpen] = useState(inputType === 'password');

    useEffect(() => {
      setInputValue(value);
    }, [value]);

    const handleInputClear = () => {
      if (onClear) {
        onClear();
      } else {
        setInputValue('');
        onChange?.('');
      }
    };

    const handleChange = (val: string) => {
      setInputValue(val);
      onChange?.(val);
    };

    const triggerPasswordType = () => {
      setEyeOpen(!eyeOpen);
    };

    let LabelComp = null;
    if (label) {
      if (typeof label === 'string') {
        LabelComp = (
          <Flex marginHorizontal="s">
            {required && (
              <Text color="dangerousColor" paddingTop="s">
                *{' '}
              </Text>
            )}
            <Text variant="primaryBody">{label}</Text>
            {colon && <Text> :</Text>}
          </Flex>
        );
      } else {
        LabelComp = (
          <Flex marginHorizontal="s">
            {required && (
              <Text color="dangerousColor" paddingTop="s">
                {' '}
                *
              </Text>
            )}
            {label}
            {colon && <Text> :</Text>}
          </Flex>
        );
      }
    }

    const InputContent = (
      <Flex flex={1}>
        <Box flexGrow={1}>
          <TextInput
            ref={ref}
            {...restProps}
            style={[
              style,
              {
                height: px(40),
                paddingLeft: theme.spacing.xs,
                fontSize: px(16),
              },
            ]}
            placeholderTextColor={theme.colors.secondaryTipColor}
            value={inputValue}
            onChangeText={handleChange}
            onSubmitEditing={e => handleChange(e.nativeEvent.text)}
            secureTextEntry={eyeOpen}
          />
        </Box>
        {allowClear && !!inputValue && (
          <TouchableOpacity activeOpacity={0.8} onPress={handleInputClear} style={{ marginRight: theme.spacing.m }}>
            <Icon name="closecircleo" color={theme.colors.overlayColor} />
          </TouchableOpacity>
        )}
        {inputType === 'password' && (
          <TouchableOpacity activeOpacity={0.8} onPress={triggerPasswordType} style={{ marginRight: theme.spacing.m }}>
            <Icon type="entypo" name={eyeOpen ? 'eye-with-line' : 'eye'} color={theme.colors.overlayColor} />
          </TouchableOpacity>
        )}
      </Flex>
    );

    return (
      <Flex borderBottomWidth={ONE_PIXEL} borderColor="borderColor" borderRadius="base">
        {LabelComp}
        {InputContent}
        {extra && <Box marginRight="m">{typeof extra === 'string' ? <Text>{extra}</Text> : extra}</Box>}
      </Flex>
    );
  }
);

export default InputItem;
