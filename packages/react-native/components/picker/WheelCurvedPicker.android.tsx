import React, { FC, useEffect, useState } from 'react';
import { requireNativeComponent, HostComponent } from 'react-native';
import { PickerItemProps } from '@react-native-community/picker/typings/Picker';
import { WheelCurvedPickerProps } from './type';

const WheelCurvedPickerNative: HostComponent<WheelCurvedPickerProps> = requireNativeComponent(
  'WheelCurvedPicker',
);

const WheelCurvedPicker: FC<WheelCurvedPickerProps> = (props) => {
  const [items, setItems] = useState<PickerItemProps[]>([]);
  const [selectedIndex, selectIndex] = useState(0);

  useEffect(() => {
    const items = props.data.map((item, index) => {
      if (item.value === props.selectedValue) {
        selectIndex(index);
      }
      return item;
    });
    setItems(items);
  }, []);

  const { data, ...restProps } = props;

  return <WheelCurvedPickerNative {...restProps} data={items} {...{ selectedIndex }} />;
};

export default WheelCurvedPicker;
