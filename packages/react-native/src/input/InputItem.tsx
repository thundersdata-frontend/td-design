import React, { forwardRef, ReactNode } from 'react';
import { StyleProp, StyleSheet, TextInput, TextInputProps, TextStyle, ViewStyle } from 'react-native';
import Animated, { FadeInRight, FadeOutRight } from 'react-native-reanimated';

import { useTheme } from '@shopify/restyle';

import Box from '../box';
import Flex from '../flex';
import helpers from '../helpers';
import Pressable from '../pressable';
import SvgIcon from '../svg-icon';
import Text from '../text';
import { Theme } from '../theme';
import useInputItem from './useInputItem';

const AnimatedTouchableIcon = Animated.createAnimatedComponent(Pressable);
const { ONE_PIXEL, px } = helpers;
export interface InputItemProps
  extends Omit<TextInputProps, 'placeholderTextColor' | 'onChange' | 'onChangeText' | 'style'> {
  /** 标签 */
  label?: ReactNode;
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
  /** 是否必填项 */
  required?: boolean;
  /** 是否显示冒号 */
  colon?: boolean;
  /** 清除内容 */
  onClear?: () => void;
  /** 是否显示底部边框 */
  border?: boolean;
  /** 容器自定义样式 */
  style?: StyleProp<ViewStyle>;
  /** 其他内容 */
  brief?: ReactNode;
}
const InputItem = forwardRef<TextInput, InputItemProps>(
  (
    {
      label,
      extra,
      inputType = 'input',
      inputStyle,
      editable = true,
      allowClear = true,
      value,
      onChange,
      onClear,
      required = false,
      style,
      brief,
      colon = false,
      border = true,
      defaultValue,
      ...restProps
    },
    ref
  ) => {
    const theme = useTheme<Theme>();
    const { LabelComp, inputValue, eyeOpen, handleChange, handleInputClear, triggerPasswordType } = useInputItem({
      inputType,
      label,
      value,
      defaultValue,
      onChange,
      onClear,
      colon,
      required,
    });

    const styles = StyleSheet.create({
      input: {
        paddingHorizontal: theme.spacing.x0,
        paddingVertical: theme.spacing.x2,
        fontSize: px(14),
        color: theme.colors.text,
      },
      clearIcon: {
        position: 'absolute',
        zIndex: 99,
        right: inputType === 'password' ? theme.spacing.x6 : theme.spacing.x1,
      },
      password: {
        position: 'absolute',
        zIndex: 99,
        right: theme.spacing.x1,
      },
    });

    const InputContent = (
      <Flex flex={1} justifyContent="flex-end" position={'relative'}>
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
          <AnimatedTouchableIcon
            entering={FadeInRight}
            exiting={FadeOutRight}
            activeOpacity={1}
            onPress={handleInputClear}
            style={styles.clearIcon}
          >
            <SvgIcon name="closecircleo" color={theme.colors.icon} />
          </AnimatedTouchableIcon>
        )}
        {inputType === 'password' && (
          <Pressable activeOpacity={1} onPress={triggerPasswordType} style={styles.password}>
            <SvgIcon name={eyeOpen ? 'eyeclose' : 'eyeopen'} color={theme.colors.icon} />
          </Pressable>
        )}
      </Flex>
    );

    return (
      <Box borderBottomWidth={border ? ONE_PIXEL : 0} borderColor="border" width="100%" style={style}>
        <Flex>
          {LabelComp}
          {InputContent}
          {!!extra && (
            <Box>
              {typeof extra === 'string' ? (
                <Text variant={'p2'} color="text">
                  {extra}
                </Text>
              ) : (
                extra
              )}
            </Box>
          )}
        </Flex>
        {!!brief && (
          <Box marginBottom="x1">
            {typeof brief === 'string' ? (
              <Text variant="p2" color="text">
                {brief}
              </Text>
            ) : (
              brief
            )}
          </Box>
        )}
      </Box>
    );
  }
);
InputItem.displayName = 'InputItem';

export default InputItem;
