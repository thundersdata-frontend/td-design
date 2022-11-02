import { PickerIOS } from '@react-native-picker/picker';
import { useTheme } from '@shopify/restyle';
import { Theme } from '@td-design/react-native';
import React, { FC } from 'react';

import { WheelPickerProps } from '../../type';

const WheelCurvedPickerIOS: FC<WheelPickerProps> = props => {
  const { data = [], onChange, value, ...restProps } = props;
  const theme = useTheme<Theme>();

  const pickerProps = {};
  const pickerItemProps = {
    color: theme.colors.gray500,
  };

  return (
    <PickerIOS {...pickerProps} {...restProps} selectedValue={value} onValueChange={val => onChange(val)}>
      {data.map(ele => (
        <PickerIOS.Item {...pickerItemProps} key={ele.value} {...ele} />
      ))}
    </PickerIOS>
  );
};

export default WheelCurvedPickerIOS;
