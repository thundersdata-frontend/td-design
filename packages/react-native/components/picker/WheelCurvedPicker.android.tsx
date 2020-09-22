import React, { FC, useEffect, useState } from 'react';
import { requireNativeComponent, HostComponent } from 'react-native';
import { ItemValue, PickerProps, WheelCurvedPickerProps } from './type';

const WheelCurvedPickerNative: HostComponent<
  Omit<PickerProps, 'onChange'> & {
    onValueChange: (e: { nativeEvent: { data: ItemValue } }) => void;
  }
> = requireNativeComponent('WheelCurvedPicker');

const WheelCurvedPickerAndroid: FC<WheelCurvedPickerProps> = props => {
  const [selectedIndex, selectIndex] = useState<number>();

  const { data, value, onChange, ...restProps } = props;

  useEffect(() => {
    const index = data.findIndex(ele => ele.value === value);
    selectIndex(index === -1 ? 0 : index);
  }, [data, value]);

  const handleChange = (e: { nativeEvent: { data: ItemValue } }) => {
    if (onChange) {
      onChange(e.nativeEvent.data);
    }
  };

  return (
    <WheelCurvedPickerNative
      {...restProps}
      onValueChange={handleChange}
      {...{ data, selectedIndex, selectedValue: value }}
    />
  );
};

export default WheelCurvedPickerAndroid;
