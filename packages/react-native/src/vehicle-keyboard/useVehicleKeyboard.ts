import { useEffect } from 'react';

import { useLatest, useMemoizedFn, useSafeState } from '@td-design/rn-hooks';

import Toast from '../toast';
import type { VehicleKeyboardInputProps } from './type';

const VehicleReg =
  /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z][A-HJ-NP-Z0-9]{4,5}[A-HJ-NP-Z0-9挂学警港澳]$/;

export default function useVehicleKeyboard({
  value,
  onChange,
  onCheck,
  placeholder = '请输入',
}: Pick<VehicleKeyboardInputProps, 'value' | 'onChange' | 'onCheck' | 'placeholder'>) {
  const [currentText, setCurrentText] = useSafeState(placeholder);
  const onChangeRef = useLatest(onChange);

  useEffect(() => {
    setCurrentText(value ? value + '' : placeholder);
  }, [value, placeholder, setCurrentText]);

  /**
   * 根据type对value进行合法性校验
   */
  const handleSubmit = async (value: string) => {
    if (!VehicleReg.test(value)) {
      Toast.middle({ content: '请输入正确的车牌号' });
      return;
    }
    await onCheck?.(value);
    setCurrentText(value || placeholder);
    onChangeRef.current?.(`${value}`);
  };

  const handleInputClear = () => {
    setCurrentText(placeholder);
    onChangeRef.current?.('');
  };

  return {
    currentText,
    handleSubmit: useMemoizedFn(handleSubmit),
    handleInputClear: useMemoizedFn(handleInputClear),
  };
}
