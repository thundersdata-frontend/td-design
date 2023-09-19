import React, { FC } from 'react';

import { CascadePickerItemProps } from '../components/WheelPicker/type';
import Cascader from './components/Cascade';
import NormalPicker from './components/Normal';
import { ModalPickerProps, PickerProps } from './type';

const Picker: FC<PickerProps & ModalPickerProps> = ({
  cascade = false,
  cols = 3,
  data,
  activeOpacity = 0.6,
  ...restProps
}) => {
  if (cascade) {
    return <Cascader {...restProps} {...{ cols, activeOpacity, data: data as CascadePickerItemProps[] }} />;
  }
  return <NormalPicker {...restProps} {...{ data, activeOpacity }} />;
};

export default Picker;
