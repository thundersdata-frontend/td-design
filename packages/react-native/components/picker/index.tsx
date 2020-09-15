import React, { FC, useState, useEffect } from 'react';
import { useTheme } from '@shopify/restyle';
import WheelCurvedPicker from './WheelCurvedPicker';
import { Theme } from '../config/theme';
import { WheelCurvedPickerProps, ItemValue } from './type';

const Picker: FC<WheelCurvedPickerProps> = (props) => {
  const theme = useTheme<Theme>();
  const [selectedValue, selectValue] = useState<ItemValue>();

  const {
    textColor = theme.colors.primaryTextColor,
    textSize = theme.borderRadii.base * 6,
    itemSpace = theme.borderRadii.base * 5,
    data,
    style,
    ...restProps
  } = props;

  useEffect(() => {
    selectValue(props.selectedValue);
  }, [props.selectedValue]);

  const handleChange = (selectedValue: ItemValue) => {
    selectValue(selectedValue);
    if (props.onValueChange) {
      props.onValueChange(selectedValue);
    }
  };

  return (
    <WheelCurvedPicker
      {...restProps}
      {...{ data, selectedValue, textColor, textSize, itemSpace }}
      onValueChange={handleChange}
      style={[{ height: 220 }, style]}
    />
  );
};

export default Picker;
