import React, { forwardRef, ReactNode, useEffect, useState } from 'react';
import { useTheme } from '@shopify/restyle';
import { TextInput, TextInputProps, TouchableOpacity } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

import InputItem from './InputItem';
import TextArea from './TextArea';
import Text from '../text';
import Flex from '../flex';
import Box from '../box';
import Icon from '../icon';
import { Theme } from '../theme';
import helpers from '../helpers';

const AnimatedTouchableIcon = Animated.createAnimatedComponent(TouchableOpacity);
const { ONE_PIXEL, px } = helpers;
export interface InputProps extends Omit<TextInputProps, 'placeholderTextColor' | 'onChange' | 'onChangeText'> {
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
  /** 是否显示冒号 */
  colon?: boolean;
  /** 是否必填项 */
  required?: boolean;
}

const Input = forwardRef<TextInput, InputProps>(
  (
    {
      label,
      labelPosition = 'left',
      leftIcon,
      rightIcon,
      inputType = 'input',
      allowClear = true,
      value,
      onChange,
      disabled = false,
      colon = false,
      required = false,
      style,
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
          <Flex marginRight="x2" marginBottom="x1" alignItems="center">
            {required && (
              <Text color="func600" paddingTop="x2">
                *{' '}
              </Text>
            )}
            <Text variant="p0" color="gray500">
              {label}
            </Text>
            <Text>{colon ? ' :' : ''}</Text>
          </Flex>
        );
      } else {
        LabelComp = (
          <Flex marginRight="x2" marginBottom="x1">
            {required && (
              <Text color="func600" paddingTop="x2">
                *{' '}
              </Text>
            )}
            {label}
            {colon ? ' :' : ''}
          </Flex>
        );
      }
    }

    const clearIconStyle = useAnimatedStyle(() => {
      return {
        marginRight: !!inputValue ? withTiming(theme.spacing.x1) : withTiming(0),
        opacity: !!inputValue ? withTiming(1) : withTiming(0),
      };
    }, [inputValue]);

    const InputContent = (
      <Flex flex={labelPosition === 'left' ? 1 : 0} borderWidth={ONE_PIXEL} borderColor="border" borderRadius="x1">
        {leftIcon && <Box marginHorizontal="x1">{leftIcon}</Box>}
        <Box flexGrow={1}>
          <TextInput
            ref={ref}
            {...restProps}
            style={[
              {
                height: px(40),
                paddingLeft: theme.spacing.x1,
                fontSize: px(16),
                color: theme.colors.text,
              },
              style,
            ]}
            editable={!disabled}
            textAlignVertical="center"
            placeholderTextColor={theme.colors.gray300}
            value={inputValue}
            onChangeText={handleChange}
            onSubmitEditing={e => handleChange(e.nativeEvent.text)}
            secureTextEntry={eyeOpen}
          />
        </Box>
        {allowClear && !!inputValue && (
          <AnimatedTouchableIcon activeOpacity={0.8} onPress={handleInputClear} style={clearIconStyle}>
            <Icon name="closecircleo" color={theme.colors.icon} />
          </AnimatedTouchableIcon>
        )}
        {inputType === 'password' && (
          <TouchableOpacity activeOpacity={0.8} onPress={triggerPasswordType} style={{ marginRight: theme.spacing.x1 }}>
            <Icon type="entypo" name={eyeOpen ? 'eye-with-line' : 'eye'} color={theme.colors.icon} />
          </TouchableOpacity>
        )}
        {rightIcon && <Box marginRight="x1">{rightIcon}</Box>}
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
  }
);

export default Object.assign(Input, {
  InputItem,
  TextArea,
});
