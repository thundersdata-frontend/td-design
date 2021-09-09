import React, { FC } from 'react';
import { Platform } from 'react-native';
import { helpers } from '@td-design/react-native';
import { WheelPickerProps } from '../../type';

import WheelPickerAndroid from './index.android';
import WheelPickerIOS from './index.ios';

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
