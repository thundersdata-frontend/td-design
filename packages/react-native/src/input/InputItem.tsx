import { useTheme } from '@shopify/restyle';
import React, { forwardRef, ReactNode } from 'react';
import { StyleProp, TextInput, TextInputProps, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';

import Box from '../box';
import Flex from '../flex';
import helpers from '../helpers';
import SvgIcon from '../svg-icon';
import Text from '../text';
import { Theme } from '../theme';
import useInputItem from './useInputItem';

const AnimatedTouchableIcon = Animated.createAnimatedComponent(TouchableOpacity);
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
      ...restProps
    },
    ref
  ) => {
    const theme = useTheme<Theme>();
    const { LabelComp, inputValue, eyeOpen, clearIconStyle, handleChange, handleInputClear, triggerPasswordType } =
      useInputItem({
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
                paddingHorizontal: theme.spacing.x1,
                fontSize: px(14),
                color: theme.colors.text,
              },
              inputStyle,
            ]}
            editable={editable}
            placeholderTextColor={theme.colors.gray300}
            value={inputValue}
            onChangeText={handleChange}
            onSubmitEditing={e => handleChange(e.nativeEvent.text)}
            secureTextEntry={eyeOpen}
          />
        </Box>
        {allowClear && editable && (
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
      <Box borderBottomWidth={border ? ONE_PIXEL : 0} borderColor="border" width="100%" style={style}>
        <Flex>
          {LabelComp}
          {InputContent}
          {extra && <Box>{typeof extra === 'string' ? <Text>{extra}</Text> : extra}</Box>}
        </Flex>
        {brief && (
          <Box marginBottom="x1">
            {typeof brief === 'string' ? (
              <Text variant="p2" color="gray300">
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

export default InputItem;
