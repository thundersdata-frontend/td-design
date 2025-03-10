import React from 'react';

import { ImperativeModalChildrenProps } from '@td-design/react-native/lib/typescript/modal/type';

import Cascader from './components/Cascade';
import NormalPicker from './components/Normal';
import { ModalPickerProps, PickerProps } from './type';

function Picker<T>({
  cascade = false,
  cols = 3,
  activeOpacity = 0.6,
  value,
  onChange,
  ...restProps
}: ImperativeModalChildrenProps<PickerProps<T> & ModalPickerProps>) {
  if (cascade) {
    return (
      <Cascader
        {...restProps}
        cols={cols}
        activeOpacity={activeOpacity}
        value={value as T[]}
        onChange={onChange as (value?: T[]) => void}
      />
    );
  }
  return (
    <NormalPicker
      {...restProps}
      activeOpacity={activeOpacity}
      value={value as T}
      onChange={onChange as (value?: T) => void}
    />
  );
}

export default Picker;
