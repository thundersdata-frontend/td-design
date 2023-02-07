import { useTheme } from '@shopify/restyle';
import React, { forwardRef, ReactNode } from 'react';
import { StyleProp, TextInput, TextInputProps, TextStyle, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';

import Box from '../box';
import Flex from '../flex';
import helpers from '../helpers';
import SvgIcon from '../svg-icon';
import Text from '../text';
import { Theme } from '../theme';
import InputItem from './InputItem';
import TextArea from './TextArea';
import useInput from './useInput';

const AnimatedTouchableIcon = Animated.createAnimatedComponent(TouchableOpacity);
const { ONE_PIXEL, px } = helpers;
export interface InputProps extends Omit<TextInputProps, 'placeholderTextColor' | 'onChange' | 'onChangeText'> {
  /** 标签 */
  label?: ReactNode;
  /** 标签位置。可选值：左侧/上方 */
  labelPosition?: 'left' | 'top';
  /** 输入类型。文本输入或者密码输入 */
  inputType?: 'input' | 'password';
  /** 输入框自定义样式 */
  inputStyle?: StyleProp<TextStyle>;
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
  /** 清除内容 */
  onClear?: () => void;
  /** 是否必填项 */
  required?: boolean;
  /** 其他内容 */
  brief?: ReactNode;
}

const Input = forwardRef<TextInput, InputProps>(
  (
    {
      label,
      labelPosition = 'left',
      leftIcon,
      rightIcon,
      inputType = 'input',
      inputStyle,
      disabled = false,
      allowClear = true,
      value,
      onChange,
      onClear,
      colon,
      required,
      style,
      brief,
      ...restProps
    },
    ref
  ) => {
    const theme = useTheme<Theme>();
    const { LabelComp, inputValue, eyeOpen, clearIconStyle, handleChange, handleInputClear, triggerPasswordType } =
      useInput({
        labelPosition,
        inputType,
        label,
        value,
        onChange,
        onClear,
        colon,
        required,
      });

    const InputContent = (
      <Flex borderWidth={ONE_PIXEL} borderColor="border" borderRadius="x1" style={[style]}>
        {leftIcon && <Box marginHorizontal="x1">{leftIcon}</Box>}
        <Box flexGrow={1}>
          <TextInput
            ref={ref}
            {...restProps}
            style={[
              {
                height: px(40),
                padding: 0,
                paddingHorizontal: theme.spacing.x1,
                fontSize: px(14),
                color: theme.colors.text,
                includeFontPadding: false,
                textAlignVertical: 'center',
              },
              inputStyle,
            ]}
            editable={!disabled}
            textAlignVertical="center"
            placeholderTextColor={theme.colors.gray300}
            selectionColor={theme.colors.gray500}
            value={inputValue}
            onChangeText={handleChange}
            onSubmitEditing={e => handleChange(e.nativeEvent.text)}
            secureTextEntry={eyeOpen}
          />
        </Box>
        {allowClear && !disabled && (
          <AnimatedTouchableIcon
            activeOpacity={0.5}
            onPress={handleInputClear}
            style={[{ width: 0, overflow: 'hidden', alignItems: 'center' }, clearIconStyle]}
          >
            <SvgIcon name="closecircleo" color={theme.colors.icon} />
          </AnimatedTouchableIcon>
        )}
        {inputType === 'password' && (
          <TouchableOpacity activeOpacity={0.5} onPress={triggerPasswordType} style={{ marginRight: theme.spacing.x1 }}>
            <SvgIcon name={eyeOpen ? 'eyeclose' : 'eyeopen'} color={theme.colors.icon} />
          </TouchableOpacity>
        )}
        {rightIcon && <Box marginRight="x1">{rightIcon}</Box>}
      </Flex>
    );

    const Brief = brief && (
      <Box marginTop="x1">
        {typeof brief === 'string' ? (
          <Text variant="p2" color="gray300">
            {brief}
          </Text>
        ) : (
          brief
        )}
      </Box>
    );

    return labelPosition === 'left' ? (
      <Flex alignItems="flex-start">
        {LabelComp}
        <Box flex={1}>
          {InputContent}
          {Brief}
        </Box>
      </Flex>
    ) : (
      <Box>
        {LabelComp}
        {InputContent}
        {Brief}
      </Box>
    );
  }
);
Input.displayName = 'Input';

export default Object.assign(Input, {
  InputItem,
  TextArea,
});
