import React, { FC, useEffect, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DatePickerProps, Event } from './type';

const DatePicker: FC<DatePickerProps> = ({ value, onChange, display, ...restProps }) => {
  const [date, setDate] = useState<Date>(new Date());

  useEffect(() => {
    setDate(value);
  }, [value]);

  const handleChange = (_: Event, date?: Date) => {
    setDate(date || new Date());
    if (onChange) {
      onChange(date);
    }
  };

  return <DateTimePicker locale="zh-CN" {...restProps} value={date} onChange={handleChange} />;
};

export default DatePicker;
