import React, { FC } from 'react';
import { Platform } from 'react-native';

import DatePickerAndroid from './DatePicker.android';
import DatePickerIOS from './DatePicker.ios';
import { DatePickerProps } from './type';

import { isIOS } from '../helper';

const DatePicker: FC<
  Omit<DatePickerProps, 'minYear' | 'maxYear' | 'labelUnit' | 'display'> &
    Required<Pick<DatePickerProps, 'minYear' | 'maxYear' | 'labelUnit' | 'display'>>
> = props => {
  if (Platform.OS === 'android') {
    return <DatePickerAndroid {...props} />;
  } else if (isIOS) {
    return <DatePickerIOS {...props} />;
  }
  return null;
};

export default DatePicker;
