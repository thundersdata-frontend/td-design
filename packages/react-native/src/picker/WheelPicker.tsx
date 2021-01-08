import React, { FC } from 'react';
import { Platform } from 'react-native';
import { WheelPickerProps } from './type';

import WheelPickerAndroid from './WheelPicker.android';
import WheelPickerIOS from './WheelPicker.ios';

import { isIOS } from '../helper';

const WheelCurvedPicker: FC<WheelPickerProps> = props => {
  if (Platform.OS === 'android') {
    return <WheelPickerAndroid {...props} />;
  } else if (isIOS) {
    return <WheelPickerIOS {...props} />;
  }
  return null;
};
export default WheelCurvedPicker;
