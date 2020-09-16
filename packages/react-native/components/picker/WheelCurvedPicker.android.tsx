import React, { FC, useEffect, useState } from 'react';
import { requireNativeComponent, HostComponent } from 'react-native';
import { ItemValue, WheelCurvedPickerProps } from './type';

const WheelCurvedPickerNative: HostComponent<
  Omit<WheelCurvedPickerProps, 'onValueChange'> & {
    onValueChange: (e: { nativeEvent: { data: ItemValue } }) => void;
  }
> = requireNativeComponent('WheelCurvedPicker');

const WheelCurvedPickerAndroid: FC<WheelCurvedPickerProps> = (props) => {
  const [selectedIndex, selectIndex] = useState<number>();

  const { data, selectedValue, onValueChange, ...restProps } = props;

  useEffect(() => {
    const index = data.findIndex((ele) => ele.value === selectedValue);
    selectIndex(index === -1 ? 0 : index);
  }, [data, selectedValue]);

  const handleChange = (e: { nativeEvent: { data: ItemValue } }) => {
    if (onValueChange) {
      onValueChange(e.nativeEvent.data);
    }
  };

  return (
    <WheelCurvedPickerNative
      {...restProps}
      onValueChange={handleChange}
      {...{ data, selectedIndex, selectedValue }}
    />
  );
};

export default WheelCurvedPickerAndroid;
