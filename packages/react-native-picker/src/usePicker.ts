import { ForwardedRef, useEffect, useImperativeHandle } from 'react';
import { Keyboard } from 'react-native';

import { useBoolean, useMemoizedFn, useSafeState } from '@td-design/rn-hooks';

import { CascadePickerItemProps } from './components/WheelPicker/type';
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
}: Pick<PickerProps<T>, 'data' | 'cascade' | 'value' | 'onChange'> & {
  placeholder?: string;
  hyphen?: string;
  ref: ForwardedRef<PickerRef>;
}) {
  const [state, setState] = useSafeState<T[] | T | undefined>(value);
  const [visible, { setTrue, setFalse }] = useBoolean(false);

  const currentText = getText(data, state, cascade, placeholder, hyphen);

  useImperativeHandle(ref, () => {
    return {
      focus: () => {
        setTrue();
      },
    };
  });

  useEffect(() => {
    setState(value);
  }, [value]);

  const handlePress = () => {
    Keyboard.dismiss();
    setTrue();
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
    visible,
    setFalse,
    handlePress: useMemoizedFn(handlePress),
    handleChange: useMemoizedFn(handleChange as (value?: T extends (infer U)[] ? U[] : T) => void),
    handleInputClear: useMemoizedFn(handleInputClear),
  };
}
