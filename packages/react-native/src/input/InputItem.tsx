import React, { forwardRef, ReactNode } from 'react';
import { StyleProp, StyleSheet, TextInput, TextInputProps, TextStyle, ViewStyle } from 'react-native';

import { useTheme } from '@shopify/restyle';

import Box from '../box';
import Brief from '../brief';
import Flex from '../flex';
import helpers from '../helpers';
import Pressable from '../pressable';
import SvgIcon from '../svg-icon';
import { Theme } from '../theme';
import useInputItem from './useInputItem';

const { px } = helpers;
export interface InputItemProps
  extends Omit<TextInputProps, 'placeholderTextColor' | 'onChange' | 'onChangeText' | 'style'> {
  /** 输入类型。文本输入或者密码输入 */
  inputType?: 'input' | 'password';
  /** 输入框自定义样式 */
  inputStyle?: StyleProp<TextStyle>;
  /** 右侧内容 */
  extra?: ReactNode;
  /** 是否显示清除图标 */
  allowClear?: boolean;
  /** 值 */
  value?: string;
  /** 输入改变事件 */
  onChange?: (value: string) => void;
  /** 清除内容 */
  onClear?: () => void;
  /** 容器自定义样式 */
  style?: StyleProp<ViewStyle>;
  inForm?: boolean;
}
const InputItem = forwardRef<TextInput, InputItemProps>(
  (
    {
      extra,
      inputType = 'input',
      inputStyle,
      editable = true,
      allowClear = true,
      value,
      onChange,
      onClear,
      style,
      defaultValue,
      inForm,
      ...restProps
    },
    ref
  ) => {
    const theme = useTheme<Theme>();
    const { inputValue, eyeOpen, handleChange, handleInputClear, triggerPasswordType } = useInputItem({
      inputType,
      value,
      defaultValue,
      onChange,
      onClear,
    });

    const styles = StyleSheet.create({
      input: {
        paddingHorizontal: theme.spacing.x0,
        paddingVertical: theme.spacing.x2,
        fontSize: px(14),
        color: theme.colors.text,
      },
    });

    return (
      <Flex flexGrow={1} paddingHorizontal={inForm ? 'x0' : 'x1'} style={style}>
        <Box flexGrow={1}>
          <TextInput
            ref={ref}
            textAlignVertical="center"
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="off"
            style={[styles.input, inputStyle]}
            editable={editable}
            placeholderTextColor={theme.colors.gray300}
            selectionColor={theme.colors.primary200}
            value={inputValue}
            onChangeText={handleChange}
            secureTextEntry={eyeOpen}
            multiline={false}
            underlineColorAndroid="transparent"
            {...restProps}
          />
        </Box>
        {allowClear && editable && !!inputValue && (
          <Pressable activeOpacity={1} onPress={handleInputClear} hitOffset={10}>
            <SvgIcon name="closecircleo" color={theme.colors.icon} />
          </Pressable>
        )}
        {inputType === 'password' && (
          <Pressable activeOpacity={1} onPress={triggerPasswordType} hitOffset={10}>
            <SvgIcon name={eyeOpen ? 'eyeclose' : 'eyeopen'} color={theme.colors.icon} />
          </Pressable>
        )}
        <Brief brief={extra} />
      </Flex>
    );
  }
);
InputItem.displayName = 'InputItem';

export default InputItem;
