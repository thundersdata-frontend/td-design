import React, { forwardRef, ReactNode } from 'react';
import { useTheme } from '@shopify/restyle';
import { TextInput, TextInputProps, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';
import { Theme } from '../theme';
import Text from '../text';
import Flex from '../flex';
import Box from '../box';
import SvgIcon from '../svg-icon';
import helpers from '../helpers';
import useInputItem from './useInputItem';

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
  /** 清除内容 */
  onClear?: () => void;
  /** 是否显示底部边框 */
  border?: boolean;
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
      border = true,
      ...restProps
    },
    ref
  ) => {
    const theme = useTheme<Theme>();
    const {
      LabelComp,
      inputValue,
      eyeOpen,
      clearIconStyle,
      handleChange,
      handleInputClear,
      triggerPasswordType,
    } = useInputItem({
      inputType,
      label,
      value,
      onChange,
      onClear,
      colon,
      required,
    });

    const InputContent = (
      <Flex flex={1} justifyContent="flex-end">
        <Box flexGrow={1}>
          <TextInput
            ref={ref}
            {...restProps}
            style={[
              {
                height: px(40),
                padding: 0,
                paddingLeft: theme.spacing.x1,
                fontSize: px(14),
                color: theme.colors.text,
              },
              style,
            ]}
            placeholderTextColor={theme.colors.gray300}
            value={inputValue}
            onChangeText={handleChange}
            onSubmitEditing={e => handleChange(e.nativeEvent.text)}
            secureTextEntry={eyeOpen}
          />
        </Box>
        {allowClear && (
          <AnimatedTouchableIcon
            activeOpacity={0.5}
            onPress={handleInputClear}
            style={[{ width: 0, overflow: 'hidden', alignItems: 'center' }, clearIconStyle]}
          >
            <SvgIcon name="closecircleo" color={theme.colors.icon} />
          </AnimatedTouchableIcon>
        )}
        {inputType === 'password' && (
          <TouchableOpacity activeOpacity={0.5} onPress={triggerPasswordType} style={{ marginRight: theme.spacing.x3 }}>
            <SvgIcon name={eyeOpen ? 'eyeclose' : 'eyeopen'} color={theme.colors.icon} />
          </TouchableOpacity>
        )}
      </Flex>
    );

    return (
      <Flex borderBottomWidth={border ? ONE_PIXEL : 0} borderColor="border" borderRadius="x1">
        {LabelComp}
        {InputContent}
        {extra && <Box marginRight="x3">{typeof extra === 'string' ? <Text>{extra}</Text> : extra}</Box>}
      </Flex>
    );
  }
);

export default InputItem;
