import React from 'react';
import { StyleSheet } from 'react-native';

import { Box, Pressable, SvgIcon, Text, Theme, useTheme } from '@td-design/react-native';

import CascaderPicker from '../cascade-picker';
import NormalPicker from '../normal-picker';
import { PickerItemProps } from '../type';
import usePicker from '../usePicker';

function PickerItem({
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
}: PickerItemProps) {
  const theme = useTheme<Theme>();
  const { state, currentText, handlePress, handleChange, handleInputClear, pickerRef } = usePicker({
    data,
    cascade,
    value,
    onChange,
    placeholder,
    hyphen,
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
        {cascade ? (
          <CascaderPicker
            data={data}
            onChange={handleChange}
            value={state as (string | number)[]}
            ref={pickerRef}
            {...restProps}
          />
        ) : (
          <NormalPicker
            data={data}
            onChange={handleChange}
            value={state as string | number}
            ref={pickerRef}
            {...restProps}
          />
        )}
      </>
    );

  return <Box style={[styles.content, style]}>{Content}</Box>;
}

export default PickerItem;
