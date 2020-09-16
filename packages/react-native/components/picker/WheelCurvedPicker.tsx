import React from 'react';
import { Platform } from 'react-native';
import { WheelCurvedPickerProps } from './type';

import WheelCurvedPickerAndroid from './WheelCurvedPicker.android';
import WheelCurvedPickerIOS from './WheelCurvedPicker.ios';

export default function WheelCurvedPicker(props: WheelCurvedPickerProps) {
  if (Platform.OS === 'android') {
    return <WheelCurvedPickerAndroid {...props} />;
  }
  return <WheelCurvedPickerIOS {...props} />;
}
