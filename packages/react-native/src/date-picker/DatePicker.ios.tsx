import React, { FC } from 'react';
import { PickerIOS } from '@react-native-picker/picker';
import Flex from '../flex';
import Box from '../box';
import { DatePickerProps } from './type';
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
            <Box flex={3} key="year">
              <PickerIOS
                {...restProps}
                selectedValue={`${value.getFullYear()}`}
                onValueChange={itemValue => onYearChange(itemValue as number)}
              >
                {yearRange.map(year => (
                  <PickerIOS.Item key={year.value} {...year} />
                ))}
              </PickerIOS>
            </Box>
          );
        case 'M':
          return (
            <Box flex={2} key="month">
              <PickerIOS
                {...restProps}
                selectedValue={`${value.getMonth() + 1}`}
                onValueChange={itemValue => onMonthChange(itemValue as number)}
              >
                {monthRange.map(year => (
                  <PickerIOS.Item key={year.value} {...year} />
                ))}
              </PickerIOS>
            </Box>
          );
        case 'D':
          return (
            <Box flex={2} key="date">
              <PickerIOS
                {...restProps}
                selectedValue={`${value.getDate()}`}
                onValueChange={itemValue => onDayChange(itemValue as number)}
              >
                {dayRange.map(year => (
                  <PickerIOS.Item key={year.value} {...year} />
                ))}
              </PickerIOS>
            </Box>
          );
        case 'H':
          return (
            <Box flex={2} key="hour">
              <PickerIOS
                {...restProps}
                selectedValue={`${value.getHours()}`}
                onValueChange={itemValue => onHourChange(itemValue as number)}
              >
                {hourRange.map(year => (
                  <PickerIOS.Item key={year.value} {...year} />
                ))}
              </PickerIOS>
            </Box>
          );
        case 'T':
          return (
            <Box flex={2} key="minute">
              <PickerIOS
                {...restProps}
                selectedValue={`${value.getMinutes()}`}
                onValueChange={itemValue => onMinuteChange(itemValue as number)}
              >
                {minuteRange.map(year => (
                  <PickerIOS.Item key={year.value} {...year} />
                ))}
              </PickerIOS>
            </Box>
          );
        default:
          return null;
      }
    });
  };

  return <Flex>{renderDateTimePicker()}</Flex>;
};

export default React.memo(DatePickerIOS);
