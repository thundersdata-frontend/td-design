import { helpers } from '@td-design/react-native';
import React, { FC } from 'react';
import { Platform } from 'react-native';

import { DatePickerProps } from '../../type';
import DatePickerAndroid from './index.android';
import DatePickerIOS from './index.ios';

const { isIOS } = helpers;
const DatePicker: FC<
  Omit<DatePickerProps, 'mode' | 'labelUnit' | 'format'> &
    Required<Pick<DatePickerProps, 'mode' | 'labelUnit' | 'format'>>
> = props => {
  if (Platform.OS === 'android') {
    return <DatePickerAndroid {...props} />;
  } else if (isIOS) {
    return <DatePickerIOS {...props} />;
  }
  return null;
};

export default DatePicker;
