import React, { forwardRef, ReactNode, useEffect, useState } from 'react';
import { useTheme } from '@shopify/restyle';
import { TextInput, TextInputProps, TouchableOpacity } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { Theme } from '../theme';
import Text from '../text';
import Flex from '../flex';
import Box from '../box';
import Icon from '../icon';
import helpers from '../helpers';

const AnimatedTouchableIcon = Animated.createAnimatedComponent(TouchableOpacity);
const { ONE_PIXEL, px } = helpers;
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
          <Flex marginHorizontal="x2">
            {required && (
              <Text color="func600" paddingTop="x2">
                *{' '}
              </Text>
            )}
            <Text variant="p0" color="gray500">
              {label}
            </Text>
            {colon && <Text> :</Text>}
          </Flex>
        );
      } else {
        LabelComp = (
          <Flex marginHorizontal="x2">
            {required && (
              <Text color="func600" paddingTop="x2">
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

    const clearIconStyle = useAnimatedStyle(() => {
      return {
        marginRight: !!inputValue ? withTiming(theme.spacing.x1) : withTiming(0),
        opacity: !!inputValue ? withTiming(1) : withTiming(0),
      };
    }, [inputValue]);

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
                paddingLeft: theme.spacing.x1,
                fontSize: px(16),
                color: theme.colors.text,
              },
            ]}
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
          <TouchableOpacity activeOpacity={0.8} onPress={triggerPasswordType} style={{ marginRight: theme.spacing.x3 }}>
            <Icon type="entypo" name={eyeOpen ? 'eye-with-line' : 'eye'} color={theme.colors.icon} />
          </TouchableOpacity>
        )}
      </Flex>
    );

    return (
      <Flex borderBottomWidth={ONE_PIXEL} borderColor="border" borderRadius="x1">
        {LabelComp}
        {InputContent}
        {extra && <Box marginRight="x3">{typeof extra === 'string' ? <Text>{extra}</Text> : extra}</Box>}
      </Flex>
    );
  }
);

export default InputItem;
