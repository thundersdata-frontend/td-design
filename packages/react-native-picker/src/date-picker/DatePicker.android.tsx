import React, { FC } from 'react';
import { Flex, Box } from '@td-design/react-native';
import { DatePickerProps } from './type';
import WheelPicker from '../picker/WheelPicker.android';
import useDatePicker from './useDatePicker';

const DatePickerAndroid: FC<
  Omit<DatePickerProps, 'minYear' | 'maxYear' | 'labelUnit' | 'display'> &
    Required<Pick<DatePickerProps, 'minYear' | 'maxYear' | 'labelUnit' | 'display'>>
> = ({ value = new Date(), minYear, maxYear, labelUnit, display = 'Y-M-D-H-T', onChange, ...restProps }) => {
  const {
    date,
    yearRange,
    monthRange,
    dayRange,
    hourRange,
    minuteRange,
    onYearChange,
    onMonthChange,
    onDayChange,
    onHourChange,
    onMinuteChange,
  } = useDatePicker({
    minYear,
    maxYear,
    labelUnit,
    value,
    onChange,
  });

  /** 生成日期picker */
  const renderDateTimePicker = () => {
    return display.split('-').map(key => {
      switch (key) {
        case 'Y':
          return (
            <Box flex={3} key="year">
              <WheelPicker
                {...restProps}
                value={date.year()}
                data={yearRange}
                onChange={itemValue => onYearChange(itemValue as number)}
              />
            </Box>
          );
        case 'M':
          return (
            <Box flex={2} key="month">
              <WheelPicker
                {...restProps}
                value={date.month() + 1}
                data={monthRange}
                onChange={itemValue => onMonthChange(itemValue as number)}
              />
            </Box>
          );
        case 'D':
          return (
            <Box flex={2} key="date">
              <WheelPicker
                {...restProps}
                value={date.date()}
                data={dayRange}
                onChange={itemValue => onDayChange(itemValue as number)}
              />
            </Box>
          );
        case 'H':
          return (
            <Box flex={2} key="hour">
              <WheelPicker
                {...restProps}
                value={date.hour()}
                data={hourRange}
                onChange={itemValue => onHourChange(itemValue as number)}
              />
            </Box>
          );
        case 'T':
          return (
            <Box flex={2} key="minute">
              <WheelPicker
                {...restProps}
                value={date.minute()}
                data={minuteRange}
                onChange={itemValue => onMinuteChange(itemValue as number)}
              />
            </Box>
          );
        default:
          return null;
      }
    });
  };

  return <Flex>{renderDateTimePicker()}</Flex>;
};

export default DatePickerAndroid;
