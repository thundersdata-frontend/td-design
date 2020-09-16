import React from 'react';
import { Platform } from 'react-native';

import DatePickerAndroid from './DatePicker.android';
import DatePickerIOS from './DatePicker.ios';
import { DatePickerProps } from './type';

export default function DatePicker(props: DatePickerProps) {
  if (Platform.OS === 'android') {
    return <DatePickerAndroid {...props} />;
  }
  return <DatePickerIOS {...props} />;
}
