import React, { FC, ReactNode, useEffect, useState } from 'react';
import { useTheme } from '@shopify/restyle';
import { TextInput, TextInputProps, TouchableOpacity } from 'react-native';
import InputItem from './InputItem';
import TextArea from './TextArea';
import { Theme } from '../config/theme';
import Text from '../text';
import Flex from '../flex';
import Box from '../box';
import Icon from '../icon';
import { ONE_PIXEL, px } from '../helper';

interface InputProps extends Omit<TextInputProps, 'placeholderTextColor' | 'onChange' | 'onChangeText'> {
  /** 标签 */
  label?: ReactNode;
  /** 标签位置。可选值：左侧/上方 */
  labelPosition?: 'left' | 'top';
  /** 输入类型。文本输入或者密码输入 */
  inputType?: 'input' | 'password';
  /** 左侧图标 */
  leftIcon?: ReactNode;
  /** 右侧图标 */
  rightIcon?: ReactNode;
  /** 是否显示清除图标 */
  allowClear?: boolean;
  /** 值 */
  value?: string;
  /** 输入改变事件 */
  onChange?: (value: string) => void;
  /** 是否禁用 */
  disabled?: boolean;
}

const Input: FC<InputProps> = ({
  label,
  labelPosition = 'left',
  leftIcon,
  rightIcon,
  inputType = 'input',
  allowClear = true,
  value,
  onChange,
  disabled = false,
  style,
  ...restProps
}) => {
  const theme = useTheme<Theme>();
  const [inputValue, setInputValue] = useState(value);
  const [eyeOpen, setEyeOpen] = useState(inputType === 'password');

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleInputClear = () => {
    if (onChange) {
      onChange('');
    } else {
      setInputValue('');
    }
  };

  const handleChange = (val: string) => {
    if (onChange) {
      onChange(val);
    } else {
      setInputValue(val);
    }
  };

  const triggerPasswordType = () => {
    setEyeOpen(!eyeOpen);
  };

  let LabelComp = null;
  if (label) {
    if (typeof label === 'string') {
      LabelComp = (
        <Box marginRight="s">
          <Text variant="primaryBody" lineHeight={px(25)}>
            {label}
          </Text>
        </Box>
      );
    } else {
      LabelComp = <Box marginRight="s">{label}</Box>;
    }
  }

  const InputContent = (
    <Flex flex={1} borderWidth={ONE_PIXEL} borderColor="borderColor" borderRadius="base">
      {leftIcon && <Box marginHorizontal="xs">{leftIcon}</Box>}
      <Box flexGrow={1}>
        <TextInput
          {...restProps}
          style={[
            style,
            {
              height: px(40),
              paddingLeft: theme.spacing.xs,
              fontSize: 16,
            },
          ]}
          editable={!disabled}
          textAlignVertical="center"
          placeholderTextColor={theme.colors.secondaryTipColor}
          value={inputValue}
          onChangeText={handleChange}
          onSubmitEditing={e => handleChange(e.nativeEvent.text)}
          secureTextEntry={eyeOpen}
        />
      </Box>
      {allowClear && !!inputValue && (
        <TouchableOpacity onPress={handleInputClear} style={{ marginRight: theme.spacing.xs }}>
          <Icon name="closecircleo" color={theme.colors.overlayColor} />
        </TouchableOpacity>
      )}
      {inputType === 'password' && (
        <TouchableOpacity activeOpacity={0.8} onPress={triggerPasswordType} style={{ marginRight: theme.spacing.xs }}>
          <Icon type="entypo" name={eyeOpen ? 'eye-with-line' : 'eye'} color={theme.colors.overlayColor} />
        </TouchableOpacity>
      )}
      {rightIcon && <Box marginRight="xs">{rightIcon}</Box>}
    </Flex>
  );

  return labelPosition === 'left' ? (
    <Flex>
      {LabelComp}
      {InputContent}
    </Flex>
  ) : (
    <Box>
      {LabelComp}
      {InputContent}
    </Box>
  );
};

export default Object.assign(Input, {
  InputItem,
  TextArea,
});
