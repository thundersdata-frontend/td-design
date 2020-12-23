import React, { FC } from 'react';
import { Platform } from 'react-native';

import DatePickerAndroid from './DatePicker.android';
import DatePickerIOS from './DatePicker.ios';
import { DatePickerProps } from './type';

const DatePicker: FC<
  Omit<DatePickerProps, 'minYear' | 'maxYear' | 'labelUnit' | 'display'> &
    Required<Pick<DatePickerProps, 'minYear' | 'maxYear' | 'labelUnit' | 'display'>>
> = props => {
  if (Platform.OS === 'android') {
    return <DatePickerAndroid {...props} />;
  } else if (Platform.OS === 'ios') {
    return <DatePickerIOS {...props} />;
  }
  return null;
};

export default DatePicker;
