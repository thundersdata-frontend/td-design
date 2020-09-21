import React, { FC } from 'react';
import { DatePickerProps } from './type';
import Flex from '../flex';
import { PickerIOS } from '@react-native-community/picker';
import useDatePicker from './useDatePicker';

const DatePickerIOS: FC<
  Omit<DatePickerProps, 'minYear' | 'maxYear' | 'labelUnit' | 'display'> &
    Required<Pick<DatePickerProps, 'minYear' | 'maxYear' | 'labelUnit' | 'display'>>
> = ({ value = new Date(), minYear, maxYear, labelUnit, display, onChange, ...restProps }) => {
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
              <PickerIOS
                {...restProps}
                selectedValue={value.getFullYear()}
                onValueChange={itemValue => onYearChange(itemValue as number)}
              >
                {yearRange.map(year => (
                  <PickerIOS.Item key={year.value} {...year} />
                ))}
              </PickerIOS>
            </Flex.Item>
          );
        case 'M':
          return (
            <Flex.Item key="month">
              <PickerIOS
                {...restProps}
                selectedValue={value.getMonth() + 1}
                onValueChange={itemValue => onMonthChange(itemValue as number)}
              >
                {monthRange.map(year => (
                  <PickerIOS.Item key={year.value} {...year} />
                ))}
              </PickerIOS>
            </Flex.Item>
          );
        case 'D':
          return (
            <Flex.Item key="date">
              <PickerIOS
                {...restProps}
                selectedValue={value.getDate()}
                onValueChange={itemValue => onDayChange(itemValue as number)}
              >
                {dayRange.map(year => (
                  <PickerIOS.Item key={year.value} {...year} />
                ))}
              </PickerIOS>
            </Flex.Item>
          );
        case 'H':
          return (
            <Flex.Item key="hour">
              <PickerIOS
                {...restProps}
                selectedValue={value.getHours()}
                onValueChange={itemValue => onHourChange(itemValue as number)}
              >
                {hourRange.map(year => (
                  <PickerIOS.Item key={year.value} {...year} />
                ))}
              </PickerIOS>
            </Flex.Item>
          );
        case 'T':
          return (
            <Flex.Item key="minute">
              <PickerIOS
                {...restProps}
                selectedValue={value.getMinutes()}
                onValueChange={itemValue => onMinuteChange(itemValue as number)}
              >
                {minuteRange.map(year => (
                  <PickerIOS.Item key={year.value} {...year} />
                ))}
              </PickerIOS>
            </Flex.Item>
          );
        default:
          return null;
      }
    });
  };

  return <Flex>{renderDateTimePicker()}</Flex>;
};

export default React.memo(DatePickerIOS);
