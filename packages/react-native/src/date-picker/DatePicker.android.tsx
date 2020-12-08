import React, { FC } from 'react';
import { DatePickerProps } from './type';
import WheelCurvedPicker from '../picker/WheelCurvedPicker.android';
import Flex from '../flex';
import useDatePicker from './useDatePicker';

const DatePickerAndroid: FC<
  Omit<DatePickerProps, 'minYear' | 'maxYear' | 'labelUnit' | 'display'> &
    Required<Pick<DatePickerProps, 'minYear' | 'maxYear' | 'labelUnit' | 'display'>>
> = ({ value = new Date(), minYear, maxYear, labelUnit, display = 'Y-M-D-H-T', onChange, ...restProps }) => {
  const {
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
            <Flex.Item key="year">
              <WheelCurvedPicker
                {...restProps}
                value={value.getFullYear()}
                data={yearRange}
                onChange={itemValue => onYearChange(itemValue as number)}
              />
            </Flex.Item>
          );
        case 'M':
          return (
            <Flex.Item key="month">
              <WheelCurvedPicker
                {...restProps}
                value={value.getMonth() + 1}
                data={monthRange}
                onChange={itemValue => onMonthChange(itemValue as number)}
              />
            </Flex.Item>
          );
        case 'D':
          return (
            <Flex.Item key="date">
              <WheelCurvedPicker
                {...restProps}
                value={value.getDate()}
                data={dayRange}
                onChange={itemValue => onDayChange(itemValue as number)}
              />
            </Flex.Item>
          );
        case 'H':
          return (
            <Flex.Item key="hour">
              <WheelCurvedPicker
                {...restProps}
                value={value.getHours()}
                data={hourRange}
                onChange={itemValue => onHourChange(itemValue as number)}
              />
            </Flex.Item>
          );
        case 'T':
          return (
            <Flex.Item key="minute">
              <WheelCurvedPicker
                {...restProps}
                value={value.getMinutes()}
                data={minuteRange}
                onChange={itemValue => onMinuteChange(itemValue as number)}
              />
            </Flex.Item>
          );
        default:
          return null;
      }
    });
  };

  return <Flex>{renderDateTimePicker()}</Flex>;
};

export default DatePickerAndroid;
