import { useTheme } from '@shopify/restyle';
import React, { FC, useEffect, useState } from 'react';
import { requireNativeComponent, HostComponent } from 'react-native';
import { Theme } from '../config/theme';
import { px } from '../helper';
import { ItemValue, PickerProps, WheelCurvedPickerProps } from './type';

const WheelCurvedPickerNative: HostComponent<
  Omit<PickerProps, 'onChange'> & {
    onValueChange: (e: { nativeEvent: { data: ItemValue } }) => void;
  }
> = requireNativeComponent('WheelCurvedPicker');

const WheelCurvedPickerAndroid: FC<WheelCurvedPickerProps> = props => {
  const theme = useTheme<Theme>();
  const [selectedIndex, selectIndex] = useState<number>();

  const {
    data,
    value,
    onChange,
    textColor = theme.colors.primaryTextColor,
    textSize = px(20, true),
    itemSpace = px(24),
    ...restProps
  } = props;

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
      {...{ data, selectedIndex, textColor, textSize, itemSpace }}
    />
  );
};

export default WheelCurvedPickerAndroid;
