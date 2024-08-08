import React, { forwardRef, ReactNode } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

import { Box, Brief, Flex, helpers, Label, Pressable, SvgIcon, Text, useTheme } from '@td-design/react-native';

import Picker from '../picker';
import { ModalPickerProps, PickerProps } from '../picker/type';
import { PickerRef } from '../type';
import usePicker from '../usePicker';

interface PickerInputProps<T> extends PickerProps<T>, Omit<ModalPickerProps, 'visible' | 'displayType'> {
  /** 标签文本 */
  label?: ReactNode;
  /** 标签文本位置 */
  labelPosition?: 'top' | 'left';
  /** 是否显示冒号 */
  colon?: boolean;
  /** 是否必填 */
  required?: boolean;
  /** 默认提示语 */
  placeholder?: string;
  /** 是否允许清除 */
  allowClear?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 额外内容 */
  brief?: ReactNode;
  /** 自定义样式 */
  style?: StyleProp<ViewStyle>;
  /** 自定义高度 */
  itemHeight?: number;
  /** 连接符 */
  hyphen?: string;
}

const { ONE_PIXEL } = helpers;

function PickerInputInner<T>(
  {
    label,
    labelPosition = 'left',
    placeholder = '请选择',
    required = false,
    colon = false,
    cascade,
    value,
    data,
    onChange,
    style,
    brief,
    allowClear = true,
    disabled = false,
    itemHeight,
    hyphen = ',',
    activeOpacity = 0.6,
    ...restProps
  }: PickerInputProps<T>,
  ref: React.ForwardedRef<PickerRef>
) {
  const theme = useTheme();
  const { state, currentText, visible, setFalse, handlePress, handleChange, handleInputClear } = usePicker({
    data,
    cascade,
    value,
    onChange,
    placeholder,
    hyphen,
    ref,
  });

  const styles = StyleSheet.create({
    content: {
      paddingVertical: theme.spacing.x2,
      paddingHorizontal: theme.spacing.x1,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      borderWidth: ONE_PIXEL,
      borderColor: theme.colors.border,
      borderRadius: theme.borderRadii.x1,
    },
    top: {},
    left: { flex: 1 },
    icon: { alignItems: 'flex-end' },
  });

  const BaseContent = (
    <>
      <Box flex={1}>
        <Text
          variant="p1"
          color={disabled ? 'disabled' : currentText === placeholder ? 'gray300' : 'text'}
          marginLeft="x2"
        >
          {currentText}
        </Text>
      </Box>
      <Flex>
        {!disabled && allowClear && !!currentText && currentText !== placeholder && (
          <Pressable activeOpacity={1} onPress={handleInputClear} hitOffset={10} style={styles.icon}>
            <SvgIcon name="closecircleo" color={theme.colors.icon} />
          </Pressable>
        )}
        <SvgIcon name="right" color={theme.colors.icon} />
      </Flex>
    </>
  );

  const Content = !disabled ? (
    <Pressable
      onPress={handlePress}
      activeOpacity={activeOpacity}
      style={[
        itemHeight ? { height: itemHeight } : {},
        styles.content,
        style,
        labelPosition === 'top' ? styles.top : styles.left,
      ]}
    >
      {BaseContent}
    </Pressable>
  ) : (
    <Box
      style={[
        itemHeight ? { height: itemHeight } : {},
        styles.content,
        style,
        labelPosition === 'top' ? styles.top : styles.left,
      ]}
    >
      {BaseContent}
    </Box>
  );

  return (
    <>
      {labelPosition === 'top' ? (
        <Box>
          <Label {...{ label, required, colon }} />
          {Content}
          <Brief brief={brief} />
        </Box>
      ) : (
        <Box>
          <Flex>
            <Label {...{ label, required, colon }} />
            {Content}
          </Flex>
          <Brief brief={brief} />
        </Box>
      )}
      <Picker {...restProps} {...{ cascade, value: state, data, visible, onChange: handleChange, onClose: setFalse }} />
    </>
  );
}

const PickerInput = forwardRef(PickerInputInner);
export default PickerInput;
