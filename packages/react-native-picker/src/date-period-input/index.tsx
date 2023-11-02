import React, { FC, ReactNode } from 'react';
import { StyleSheet } from 'react-native';

import { Box, Flex, helpers, Pressable, SvgIcon, Text, useTheme } from '@td-design/react-native';
import { useSafeState } from '@td-design/rn-hooks';
import dayjs from 'dayjs';

import { DatePickerPropsBase, ModalPickerProps } from '../components/DatePicker/type';
import DatePicker from '../date-picker';
import useDatePeriodInput from './useDatePeriodInput';

export interface DatePeriodInputProps
  extends Omit<DatePickerPropsBase, 'value' | 'onChange' | 'minDate' | 'maxDate'>,
    Omit<ModalPickerProps, 'visible' | 'displayType'> {
  /** 标签文本 */
  label?: ReactNode;
  /** 默认提示语 */
  placeholders?: string[];
  value?: [Date | undefined, Date | undefined];
  onChange?: (value: [Date | undefined, Date | undefined]) => void;
  /** 是否允许清除 */
  allowClear?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
}

const { ONE_PIXEL } = helpers;

/** 适用于筛选条件下的日期区间选择 */
const DatePeriodInput: FC<DatePeriodInputProps> = ({
  label,
  placeholders = ['请选择', '请选择'],
  format = 'YYYY-MM-DD',
  value,
  onChange,
  allowClear = true,
  disabled = false,
  activeOpacity = 0.6,
  ...restProps
}) => {
  const theme = useTheme();
  const {
    currentIndex,
    dates,
    visible,
    minDate,
    maxDate,
    setFalse,
    handleStartPress,
    handleEndPress,
    handleChange,
    handleInputClear1,
    handleInputClear2,
  } = useDatePeriodInput({ value, onChange, format });

  const [containerWidth, setContainerWidth] = useSafeState(0);
  const [symbolWidth, setSymbolWidth] = useSafeState(0);

  const styles = StyleSheet.create({
    content: {
      width: (containerWidth - symbolWidth) / 2,
      paddingVertical: theme.spacing.x2,
      paddingHorizontal: theme.spacing.x1,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
    },
    icon: { alignItems: 'flex-end' },
  });

  const BaseContent1 = (
    <>
      <Flex>
        <SvgIcon name="date" color={theme.colors.icon} />
        <Text variant="p1" color={disabled ? 'disabled' : 'text'} marginLeft="x2">
          {dates[0] ? dayjs(dates[0]).format(format) : placeholders[0]}
        </Text>
      </Flex>
      {!disabled && allowClear && dates[0] && (
        <Pressable activeOpacity={1} onPress={handleInputClear1} style={styles.icon}>
          <SvgIcon name="closecircleo" color={theme.colors.icon} />
        </Pressable>
      )}
    </>
  );

  const BaseContent2 = (
    <>
      <Flex>
        <SvgIcon name="date" color={theme.colors.icon} />
        <Text variant="p1" color={disabled ? 'disabled' : 'text'} marginLeft="x2">
          {dates[1] ? dayjs(dates[1]).format(format) : placeholders[1]}
        </Text>
      </Flex>
      {!disabled && allowClear && dates[1] && (
        <Pressable activeOpacity={1} onPress={handleInputClear2} style={styles.icon}>
          <SvgIcon name="closecircleo" color={theme.colors.icon} />
        </Pressable>
      )}
    </>
  );

  const Content1 = disabled ? (
    <Box style={styles.content}>{BaseContent1}</Box>
  ) : (
    <Pressable onPress={handleStartPress} activeOpacity={activeOpacity} style={styles.content}>
      {BaseContent1}
    </Pressable>
  );

  const Content2 = disabled ? (
    <Box style={styles.content}>{BaseContent2}</Box>
  ) : (
    <Pressable onPress={handleEndPress} activeOpacity={activeOpacity} style={styles.content}>
      {BaseContent2}
    </Pressable>
  );

  return (
    <Box>
      <Label label={label} />
      <Flex
        justifyContent="space-between"
        alignItems="center"
        borderWidth={ONE_PIXEL}
        borderColor="border"
        borderRadius="x1"
        onLayout={e => setContainerWidth(e.nativeEvent.layout.width)}
      >
        {Content1}
        <Box paddingHorizontal="x2" onLayout={e => setSymbolWidth(e.nativeEvent.layout.width)}>
          <Text variant="p1" color="text">
            ~
          </Text>
        </Box>
        {Content2}
      </Flex>
      <DatePicker
        {...restProps}
        {...{
          visible,
          format,
          onChange: handleChange,
          onClose: setFalse,
          minDate,
          maxDate,
          value: dates[currentIndex],
        }}
      />
    </Box>
  );
};

export default DatePeriodInput;

const Label = ({ label }: Pick<DatePeriodInputProps, 'label'>) => {
  if (!!label)
    return (
      <Flex marginRight="x2" marginBottom="x1" alignItems="center">
        {typeof label === 'string' ? (
          <Text variant="p1" color="text">
            {label}
          </Text>
        ) : (
          label
        )}
      </Flex>
    );
  return null;
};
