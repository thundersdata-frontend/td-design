import React, { ForwardedRef, useImperativeHandle } from 'react';
import { Keyboard } from 'react-native';

import { Modal } from '@td-design/react-native';
import { useMemoizedFn, useSafeState } from '@td-design/rn-hooks';

import { CascadePickerItemProps } from './components/WheelPicker/type';
import Picker from './picker';
import { PickerProps } from './picker/type';
import { PickerRef } from './type';
import { transformValueToLabel } from './utils';

function getText<T>(
  data: CascadePickerItemProps<T>[],
  value?: T[] | T,
  cascade?: boolean,
  placeholder?: string,
  hyphen?: string
) {
  if (value) {
    return transformValueToLabel(data, value, cascade, hyphen) || placeholder;
  }
  return placeholder;
}

export default function usePicker<T>({
  data,
  cascade = false,
  value,
  onChange,
  placeholder = '请选择',
  hyphen,
  ref,
  ...restProps
}: Pick<PickerProps<T>, 'data' | 'cascade' | 'value' | 'onChange'> & {
  placeholder?: string;
  hyphen?: string;
  ref: ForwardedRef<PickerRef>;
}) {
  const [state, setState] = useSafeState<T[] | T | undefined>(value);

  const currentText = getText(data, state, cascade, placeholder, hyphen);

  useImperativeHandle(ref, () => {
    return {
      focus: () => {
        Modal.show(<Picker {...restProps} {...{ cascade, value: state as any, data, onChange: handleChange }} />, {
          position: 'bottom',
        });
      },
    };
  });

  const handlePress = () => {
    Keyboard.dismiss();
    Modal.show(<Picker {...restProps} {...{ cascade, value: state as any, data, onChange: handleChange }} />, {
      position: 'bottom',
    });
  };

  const handleChange = (value?: T[] | T) => {
    setState(value);

    if (cascade) {
      (onChange as (value?: T[]) => void)?.(value as T[]);
    } else {
      (onChange as (value?: T) => void)?.(value as T);
    }
  };

  const handleInputClear = () => {
    setState(undefined);
    onChange?.(undefined);
  };

  return {
    state,
    currentText,
    handlePress: useMemoizedFn(handlePress),
    handleChange: useMemoizedFn(handleChange as (value?: T extends (infer U)[] ? U[] : T) => void),
    handleInputClear: useMemoizedFn(handleInputClear),
  };
}
