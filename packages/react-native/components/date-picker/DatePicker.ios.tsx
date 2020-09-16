import React, { FC } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DatePickerProps, Event } from './type';

const DatePickerIOS: FC<DatePickerProps> = ({
  value = new Date(),
  onChange,
  display,
  ...restProps
}) => {
  const handleChange = (_: Event, date?: Date) => {
    if (onChange) {
      onChange(date);
    }
  };

  return <DateTimePicker locale="zh-CN" {...restProps} {...{ value }} onChange={handleChange} />;
};

export default DatePickerIOS;
