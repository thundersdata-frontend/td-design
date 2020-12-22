import React, { FC } from 'react';
import { PickerIOS } from '@react-native-picker/picker';
import { WheelPickerProps } from './type';

const WheelCurvedPickerIOS: FC<WheelPickerProps> = props => {
  const { data = [], onChange, value, ...restProps } = props;

  return (
    <PickerIOS {...restProps} selectedValue={value} onValueChange={val => onChange(val)}>
      {data.map(ele => (
        <PickerIOS.Item key={ele.value} {...ele} />
      ))}
    </PickerIOS>
  );
};

export default WheelCurvedPickerIOS;
