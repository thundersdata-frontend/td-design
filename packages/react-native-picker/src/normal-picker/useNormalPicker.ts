import { ForwardedRef, useImperativeHandle } from 'react';

import { useMemoizedFn, useSafeState } from '@td-design/rn-hooks';

import { PickerData } from '../components/WheelPicker/type';
import { NormalPickerProps, PickerRef } from '../type';

export default function useNormalPicker({
  value,
  initialValue,
  onChange,
  ref,
}: Omit<NormalPickerProps, 'data'> & { initialValue?: string | number } & {
  ref: ForwardedRef<PickerRef>;
}) {
  const [selectedValue, selectValue] = useSafeState(value || initialValue);
  const [visible, setVisible] = useSafeState(false);

  useImperativeHandle(ref, () => ({
    show: () => {
      setVisible(true);
    },
    hide: () => {
      setVisible(false);
    },
  }));

  const handleChange = (val: PickerData<string | number>) => {
    selectValue(val.value);
  };

  const handleClose = () => {
    selectValue(value);
    setVisible(false);
  };

  const handleOk = () => {
    onChange?.(selectedValue || initialValue);
    setVisible(false);
  };

  return {
    selectedValue,
    visible,
    ref,
    handleChange: useMemoizedFn(handleChange),
    handleOk: useMemoizedFn(handleOk),
    handleClose: useMemoizedFn(handleClose),
  };
}
