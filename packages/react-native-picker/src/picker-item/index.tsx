import React from 'react';
import { forwardRef } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

import { Box, Pressable, SvgIcon, Text, Theme, useTheme } from '@td-design/react-native';

import Picker from '../picker';
import { ModalPickerProps, PickerProps } from '../picker/type';
import { PickerRef } from '../type';
import usePicker from '../usePicker';

interface PickerItemProps<T> extends PickerProps<T>, Omit<ModalPickerProps, 'visible' | 'displayType'> {
  placeholder?: string;
  /** 是否允许清除 */
  allowClear?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 自定义样式 */
  style?: StyleProp<ViewStyle>;
  /** 是否在表单里 */
  inForm?: boolean;
  /** 连接符 */
  hyphen?: string;
}

function PickerItemInner<T>(
  {
    placeholder = '请选择',
    disabled = false,
    cascade,
    value,
    data,
    onChange,
    style,
    allowClear = true,
    hyphen = ',',
    activeOpacity = 0.6,
    inForm,
    ...restProps
  }: PickerItemProps<T>,
  ref: React.ForwardedRef<PickerRef>
) {
  const theme = useTheme<Theme>();
  const { currentText, visible, state, setFalse, handlePress, handleChange, handleInputClear } = usePicker({
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
      flexGrow: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: theme.spacing[inForm ? 'x0' : 'x1'],
    },
    icon: { alignItems: 'flex-end' },
  });

  const Content = (
    <>
      <Text
        variant="p1"
        color={disabled ? 'disabled' : currentText === placeholder ? 'gray300' : 'text'}
        numberOfLines={1}
        textAlign={'right'}
        style={{ flex: 1 }}
      >
        {currentText}
      </Text>
      {!disabled && allowClear && !!currentText && currentText !== placeholder && (
        <Pressable activeOpacity={1} onPress={handleInputClear} hitOffset={10} style={styles.icon}>
          <SvgIcon name="closecircleo" color={theme.colors.icon} />
        </Pressable>
      )}
    </>
  );

  if (!disabled)
    return (
      <>
        <Pressable onPress={handlePress} activeOpacity={activeOpacity} style={[styles.content, style]}>
          {Content}
        </Pressable>
        <Picker
          {...restProps}
          {...{ cascade, value: state, data, visible, onChange: handleChange, onClose: setFalse }}
        />
      </>
    );

  return <Box style={[styles.content, style]}>{Content}</Box>;
}

const PickerItem = forwardRef(PickerItemInner);

export default PickerItem;
