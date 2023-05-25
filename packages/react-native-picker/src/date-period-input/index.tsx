import React, { FC, ReactNode } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';

import { Box, Flex, helpers, SvgIcon, Text, useTheme } from '@td-design/react-native';
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

const AnimatedTouchableIcon = Animated.createAnimatedComponent(TouchableOpacity);
const { px, ONE_PIXEL } = helpers;

/** 适用于筛选条件下的日期区间选择 */
const DatePeriodInput: FC<DatePeriodInputProps> = ({
  label,
  placeholders = ['请选择', '请选择'],
  format = 'YYYY-MM-DD',
  value,
  onChange,
  allowClear = true,
  disabled = false,
  activeOpacity = 0.5,
  ...restProps
}) => {
  const theme = useTheme();
  const {
    currentIndex,
    dates,
    visible,
    minDate,
    maxDate,
    clearIconStyle1,
    clearIconStyle2,
    setFalse,
    handleStartPress,
    handleEndPress,
    handleChange,
    handleInputClear1,
    handleInputClear2,
  } = useDatePeriodInput({ value, onChange, format });

  const styles = StyleSheet.create({
    content: {
      flex: 1,
      height: px(40),
      paddingHorizontal: theme.spacing.x1,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
    },
    icon: { width: 0, overflow: 'hidden', alignItems: 'flex-end' },
  });

  const renderLabel = () => {
    if (!!label)
      return (
        <Flex marginRight="x2" marginBottom="x1" alignItems="center">
          {typeof label === 'string' ? (
            <Text variant="p1" color="gray500">
              {label}
            </Text>
          ) : (
            label
          )}
        </Flex>
      );
    return null;
  };

  const renderContent1 = () => (
    <>
      <Flex>
        <SvgIcon name="date" color={theme.colors.icon} />
        <Text variant="p1" color={disabled ? 'disabled' : 'gray300'} marginLeft="x2">
          {dates[0] ? dayjs(dates[0]).format(format) : placeholders[0]}
        </Text>
      </Flex>
      {!disabled && allowClear && (
        <AnimatedTouchableIcon activeOpacity={1} onPress={handleInputClear1} style={[styles.icon, clearIconStyle1]}>
          <SvgIcon name="closecircleo" color={theme.colors.icon} />
        </AnimatedTouchableIcon>
      )}
    </>
  );

  const renderContent2 = () => (
    <>
      <Flex>
        <SvgIcon name="date" color={theme.colors.icon} />
        <Text variant="p1" color={disabled ? 'disabled' : 'gray300'} marginLeft="x2">
          {dates[1] ? dayjs(dates[1]).format(format) : placeholders[1]}
        </Text>
      </Flex>
      {!disabled && allowClear && (
        <AnimatedTouchableIcon activeOpacity={1} onPress={handleInputClear2} style={[styles.icon, clearIconStyle2]}>
          <SvgIcon name="closecircleo" color={theme.colors.icon} />
        </AnimatedTouchableIcon>
      )}
    </>
  );

  const Content1 = disabled ? (
    <Box style={styles.content}>{renderContent1()}</Box>
  ) : (
    <TouchableOpacity onPress={handleStartPress} activeOpacity={activeOpacity} style={styles.content}>
      {renderContent1()}
    </TouchableOpacity>
  );

  const Content2 = disabled ? (
    <Box style={styles.content}>{renderContent2()}</Box>
  ) : (
    <TouchableOpacity onPress={handleEndPress} activeOpacity={activeOpacity} style={styles.content}>
      {renderContent2()}
    </TouchableOpacity>
  );

  return (
    <Box>
      {renderLabel()}
      <Flex
        justifyContent="space-between"
        alignItems="center"
        borderWidth={ONE_PIXEL}
        borderColor="border"
        borderRadius="x1"
      >
        {Content1}
        <Box marginHorizontal="x2">
          <Text variant="p1" color="gray300">
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
