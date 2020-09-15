import React, { FC } from 'react';
import { PickerIOS } from '@react-native-community/picker';
import { WheelCurvedPickerProps } from './type';

const WheelCurvedPicker: FC<WheelCurvedPickerProps> = (props) => {
  const { data = [], ...restProps } = props;
  return (
    <PickerIOS {...restProps}>
      {data.map((item) => (
        <PickerIOS.Item key={item.value} {...item} />
      ))}
    </PickerIOS>
  );
};

export default WheelCurvedPicker;
