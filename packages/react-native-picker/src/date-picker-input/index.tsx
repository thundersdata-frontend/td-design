import React, { ReactNode } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

import { Box, Brief, Flex, helpers, Label, Pressable, SvgIcon, Text, useTheme } from '@td-design/react-native';

import { DatePickerPropsBase } from '../components/DatePicker/type';
import DatePicker from '../date-picker';
import { ModalPickerProps } from '../type';
import useDatePicker from '../useDatePicker';

export interface DatePickerInputProps extends DatePickerPropsBase, Omit<ModalPickerProps, 'visible' | 'displayType'> {
  /** 标签文本 */
  label?: ReactNode;
  /** 标签文本位置 */
  labelPosition?: 'top' | 'left';
  /** 是否显示冒号 */
  colon?: boolean;
  /** 是否必填 */
  required?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 默认提示语 */
  placeholder?: string;
  /** 是否允许清除 */
  allowClear?: boolean;
  /** 额外内容 */
  brief?: ReactNode;
  style?: StyleProp<ViewStyle>;
  itemHeight?: number;
}

const { ONE_PIXEL } = helpers;

/** 适用于筛选条件下的日期选择 */
const DatePickerInput = ({
  label,
  labelPosition = 'left',
  placeholder = '请选择',
  required = false,
  colon = false,
  format = 'YYYY-MM-DD',
  value,
  onChange,
  style,
  brief,
  allowClear = true,
  disabled = false,
  itemHeight,
  activeOpacity = 0.6,
  ...restProps
}: DatePickerInputProps) => {
  const theme = useTheme();
  const { date, handleChange, currentText, handleInputClear, handlePress, datePickerRef } = useDatePicker({
    value,
    format,
    onChange,
    placeholder,
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
      <Flex flex={1}>
        <SvgIcon name="date" color={theme.colors.icon} />
        <Text variant="p1" color={currentText === placeholder ? 'gray300' : 'text'} marginLeft="x2">
          {currentText}
        </Text>
      </Flex>
      <Flex>
        {allowClear && !!currentText && currentText !== placeholder && (
          <Pressable activeOpacity={1} onPress={handleInputClear} style={styles.icon}>
            <SvgIcon name="closecircleo" color={theme.colors.icon} />
          </Pressable>
        )}
        <SvgIcon name="right" color={theme.colors.icon} />
      </Flex>
    </Pressable>
  ) : (
    <Box style={[styles.content, style, labelPosition === 'top' ? styles.top : styles.left]}>
      <Flex flex={1}>
        <SvgIcon name="date" color={theme.colors.icon} />
        <Text variant="p1" color={'disabled'} marginLeft="x2">
          {currentText}
        </Text>
      </Flex>
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
      <DatePicker ref={datePickerRef} value={date} onChange={handleChange} {...restProps} />
    </>
  );
};
export default DatePickerInput;
