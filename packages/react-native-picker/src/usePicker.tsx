import { useRef } from 'react';
import { Keyboard } from 'react-native';

import { useMemoizedFn, useSafeState } from '@td-design/rn-hooks';

import { CascadePickerItemProps } from './components/WheelPicker/type';
import { PickerInputProps, PickerRef } from './type';
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

export default function usePicker<T extends string | number>({
  data,
  cascade = false,
  value,
  onChange,
  placeholder = '请选择',
  hyphen,
}: Pick<PickerInputProps, 'data' | 'value' | 'cascade' | 'onChange'> & {
  placeholder?: string;
  hyphen?: string;
}) {
  const pickerRef = useRef<PickerRef>(null);
  const [state, setState] = useSafeState(value);

  const currentText = getText(data, state, cascade, placeholder, hyphen);

  const handlePress = () => {
    Keyboard.dismiss();
    pickerRef.current?.show();
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
    pickerRef,
    handlePress: useMemoizedFn(handlePress),
    handleChange: useMemoizedFn(handleChange),
    handleInputClear: useMemoizedFn(handleInputClear),
  };
}
