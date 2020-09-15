import React, { FC } from 'react';
import { PickerIOS } from '@react-native-community/picker';
import { ItemValue, WheelCurvedPickerProps } from './type';

const WheelCurvedPickerIOS: FC<WheelCurvedPickerProps> = (props) => {
  const { data = [], onValueChange, ...restProps } = props;

  const handleChange = (selectedValue: ItemValue) => {
    if (onValueChange) {
      onValueChange(selectedValue);
    }
  };

  return (
    <PickerIOS {...restProps} onValueChange={handleChange}>
      {data.map((item) => (
        <PickerIOS.Item key={item.value} {...item} />
      ))}
    </PickerIOS>
  );
};

export default WheelCurvedPickerIOS;
