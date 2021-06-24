import React, { FC } from 'react';
import { Platform } from 'react-native';
import { helpers } from '@td-design/react-native';
import { WheelPickerProps } from './type';

import WheelPickerAndroid from './WheelPicker.android';
import WheelPickerIOS from './WheelPicker.ios';

const { isIOS } = helpers;
const WheelCurvedPicker: FC<WheelPickerProps> = props => {
  if (Platform.OS === 'android') {
    return <WheelPickerAndroid {...props} />;
  } else if (isIOS) {
    return <WheelPickerIOS {...props} />;
  }
  return null;
};
export default WheelCurvedPicker;
