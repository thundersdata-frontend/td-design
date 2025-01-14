import { ImperativeModalChildrenProps } from '@td-design/react-native/lib/typescript/modal/type';
import { useMemoizedFn, useSafeState } from '@td-design/rn-hooks';

import { PickerData } from '../../../components/WheelPicker/type';
import { NormalPickerProps } from '../../type';

export default function useNormalPicker<T>({
  value,
  initialValue,
  onChange,
  closeModal,
}: ImperativeModalChildrenProps<Omit<NormalPickerProps<T>, 'data'> & { initialValue?: T }>) {
  const [selectedValue, selectValue] = useSafeState<T | undefined>(value || initialValue);

  const handleChange = (val: PickerData<T>) => {
    selectValue(val.value);
  };

  const handleClose = () => {
    selectValue(value);
    closeModal?.();
  };

  const handleOk = () => {
    onChange?.(selectedValue || initialValue);
    closeModal?.();
  };

  return {
    selectedValue,
    handleChange: useMemoizedFn(handleChange),
    handleOk: useMemoizedFn(handleOk),
    handleClose: useMemoizedFn(handleClose),
  };
}
