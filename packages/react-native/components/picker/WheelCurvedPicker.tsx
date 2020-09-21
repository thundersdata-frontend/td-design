import React, { FC } from 'react';
import { Platform } from 'react-native';
import { WheelCurvedPickerProps } from './type';

import WheelCurvedPickerAndroid from './WheelCurvedPicker.android';
import WheelCurvedPickerIOS from './WheelCurvedPicker.ios';

const WheelCurvedPicker: FC<WheelCurvedPickerProps> = props => {
  if (Platform.OS === 'android') {
    return <WheelCurvedPickerAndroid {...props} />;
  }
  return <WheelCurvedPickerIOS {...props} />;
};
export default WheelCurvedPicker;
