import React, { FC, ReactNode } from 'react';
import { StyleSheet } from 'react-native';

import { Box, Brief, Flex, helpers, Label, Pressable, SvgIcon, Text, useTheme } from '@td-design/react-native';
import dayjs from 'dayjs';

import { DatePickerPropsBase, ModalPickerProps } from '../components/DatePicker/type';
import DatePicker from '../date-picker';
import useDatePeriodInput from './useDatePeriodInput';

export interface DatePeriodInputProps
  extends Omit<DatePickerPropsBase, 'value' | 'onChange' | 'minDate' | 'maxDate'>,
    Omit<ModalPickerProps, 'visible' | 'displayType'> {
  /** 标签文本 */
  label?: ReactNode;
  /** 标签文本位置 */
  labelPosition?: 'top' | 'left';
  /** 是否显示冒号 */
  colon?: boolean;
  /** 是否必填 */
  required?: boolean;
  /** 默认提示语 */
  placeholders?: string[];
  value?: [Date | undefined, Date | undefined];
  onChange?: (value: [Date | undefined, Date | undefined]) => void;
  /** 是否允许清除 */
  allowClear?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 额外内容 */
  brief?: ReactNode;
  itemHeight?: number;
}

const { ONE_PIXEL } = helpers;

/** 适用于筛选条件下的日期区间选择 */
const DatePeriodInput: FC<DatePeriodInputProps> = ({
  label,
  labelPosition = 'left',
  required = false,
  colon = false,
  placeholders = ['请选择', '请选择'],
  format = 'YYYY-MM-DD',
  value,
  onChange,
  allowClear = true,
  disabled = false,
  itemHeight,
  activeOpacity = 0.6,
  brief,
  ...restProps
}) => {
  const theme = useTheme();
  const { dates, order, datePickerRef, handleChange, handleStartPress, handleEndPress, clearStartDate, clearEndDate } =
    useDatePeriodInput({
      value,
      onChange,
    });

  const styles = StyleSheet.create({
    content: {
      paddingVertical: theme.spacing.x2,
      paddingHorizontal: theme.spacing.x1,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
    },
    icon: { alignItems: 'flex-end' },
  });

  const Content = (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      borderWidth={ONE_PIXEL}
      borderColor="border"
      borderRadius="x1"
      style={{
        ...(itemHeight ? { height: itemHeight } : {}),
        ...(labelPosition === 'top' ? {} : { flex: 1 }),
      }}
    >
      <Pressable disabled={disabled} onPress={handleStartPress} activeOpacity={activeOpacity} style={styles.content}>
        <Flex>
          <SvgIcon name="date" color={theme.colors.icon} />
          <Text variant="p2" color={disabled ? 'disabled' : dates[0] ? 'text' : 'gray300'} marginLeft="x2">
            {dates[0] ? dayjs(dates[0]).format(format) : placeholders[0]}
          </Text>
        </Flex>
        {!disabled && allowClear && dates[0] && (
          <Pressable activeOpacity={1} onPress={clearStartDate} hitOffset={10} style={styles.icon}>
            <SvgIcon name="closecircleo" color={theme.colors.icon} />
          </Pressable>
        )}
      </Pressable>
      <Box paddingHorizontal="x2">
        <Text variant="p1" color="text">
          ~
        </Text>
      </Box>
      <Pressable disabled={disabled} onPress={handleEndPress} activeOpacity={activeOpacity} style={styles.content}>
        <Flex>
          <SvgIcon name="date" color={theme.colors.icon} />
          <Text variant="p2" color={disabled ? 'disabled' : dates[1] ? 'text' : 'gray300'} marginLeft="x2">
            {dates[1] ? dayjs(dates[1]).format(format) : placeholders[1]}
          </Text>
        </Flex>
        {!disabled && allowClear && dates[1] && (
          <Pressable activeOpacity={1} onPress={clearEndDate} hitOffset={10} style={styles.icon}>
            <SvgIcon name="closecircleo" color={theme.colors.icon} />
          </Pressable>
        )}
      </Pressable>
    </Flex>
  );

  return (
    <>
      {labelPosition === 'top' ? (
        <Box>
          <Label {...{ label, colon, required }} />
          {Content}
          <Brief brief={brief} />
        </Box>
      ) : (
        <Box>
          <Flex>
            <Label {...{ label, colon, required }} />
            {Content}
          </Flex>
          <Brief brief={brief} />
        </Box>
      )}
      <DatePicker
        ref={datePickerRef}
        value={order === 'start' ? dates[0] : dates[1]}
        onChange={handleChange}
        {...restProps}
        minDate={order === 'end' ? dates[0] : undefined}
        maxDate={order === 'start' ? dates[1] : undefined}
      />
    </>
  );
};

export default DatePeriodInput;
