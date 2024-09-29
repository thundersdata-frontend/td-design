import { useEffect } from 'react';

import { useMemoizedFn, useSafeState } from '@td-design/rn-hooks';

import { PickerData } from '../../../components/WheelPicker/type';
import { NormalPickerProps } from '../../type';

export default function useNormalPicker<T>({
  value,
  initialValue,
  onChange,
  onClose,
  displayType,
}: Omit<NormalPickerProps<T>, 'data'> & { initialValue?: T }) {
  const [selectedValue, selectValue] = useSafeState<T | undefined>();

  useEffect(() => {
    selectValue(value || initialValue);
  }, [value, initialValue]);

  const handleChange = (val: PickerData<T>) => {
    if (displayType === 'view') {
      onChange?.(val.value);
    } else {
      selectValue(val.value);
    }
  };

  const handleClose = () => {
    selectValue(value);
    onClose?.();
  };

  const handleOk = () => {
    onChange?.(selectedValue);
    onClose?.();
  };

  return {
    selectedValue,
    handleChange: useMemoizedFn(handleChange),
    handleOk: useMemoizedFn(handleOk),
    handleClose: useMemoizedFn(handleClose),
  };
}
