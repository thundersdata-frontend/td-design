import React, { forwardRef } from 'react';
import Cascader from './Cascader';
import NormalPicker from './NormalPicker';
import { PickerProps, ModalPickerProps, CascadePickerItemProps, PickerRefProps } from './type';

const Picker = forwardRef<PickerRefProps, PickerProps & ModalPickerProps>(
  ({ cascade = false, cols = 3, data, ...restProps }, ref) => {
    if (cascade) {
      return <Cascader ref={ref} {...restProps} {...{ cols, data: data as CascadePickerItemProps[] }} />;
    }
    return <NormalPicker ref={ref} {...restProps} {...{ data }} />;
  }
);

export default Picker;
