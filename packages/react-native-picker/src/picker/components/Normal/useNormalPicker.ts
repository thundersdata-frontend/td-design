import { useEffect } from 'react';
import { BackHandler } from 'react-native';

import { useMemoizedFn, useSafeState } from '@td-design/rn-hooks';

import { PickerData } from '../../../components/WheelPicker/type';
import { NormalPickerProps } from '../../type';

export default function useNormalPicker<T>({
  value,
  initialValue,
  onChange,
  onClose,
  visible,
  displayType,
}: Omit<NormalPickerProps<T>, 'data'> & { initialValue?: T }) {
  const [selectedValue, selectValue] = useSafeState<T | undefined>();

  useEffect(() => {
    selectValue(value || initialValue);
  }, [value, initialValue]);

  /** 绑定物理返回键监听事件，如果当前picker是打开的，返回键作用是关闭picker，否则返回上一个界面 */
  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => visible);
    return () => sub.remove();
  }, [visible]);

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
