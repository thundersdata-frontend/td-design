import React, { FC } from 'react';
import { PickerIOS } from '@react-native-community/picker';
import { WheelCurvedPickerProps } from './type';

const WheelCurvedPickerIOS: FC<WheelCurvedPickerProps> = (props) => {
  const { data = [], onValueChange, ...restProps } = props;

  return (
    <PickerIOS {...restProps} onValueChange={onValueChange}>
      {data.map((item) => (
        <PickerIOS.Item key={item.value} {...item} />
      ))}
    </PickerIOS>
  );
};

export default WheelCurvedPickerIOS;
