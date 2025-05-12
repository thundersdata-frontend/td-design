import React from 'react';
import { StyleSheet } from 'react-native';

import { Box, Brief, Flex, helpers, Label, Pressable, SvgIcon, Text, useTheme } from '@td-design/react-native';

import CascaderPicker from '../cascade-picker';
import NormalPicker from '../normal-picker';
import { PickerInputProps } from '../type';
import usePicker from '../usePicker';

const { ONE_PIXEL } = helpers;

function PickerInput({
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
}: PickerInputProps) {
  const theme = useTheme();
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
}

export default PickerInput;
