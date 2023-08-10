import { ForwardedRef, useEffect, useImperativeHandle } from 'react';
import { useAnimatedStyle, withTiming } from 'react-native-reanimated';

import { useBoolean, useLatest, useMemoizedFn, useSafeState } from '@td-design/rn-hooks';

import Toast from '../toast';
import type { VehicleKeyboardInputProps, VehicleKeyboardRef } from './type';

const VehicleReg =
  /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z][A-HJ-NP-Z0-9]{4,5}[A-HJ-NP-Z0-9挂学警港澳]$/;

export default function useVehicleKeyboard({
  value,
  onChange,
  onCheck,
  placeholder = '请输入',
  ref,
}: Pick<VehicleKeyboardInputProps, 'value' | 'onChange' | 'onCheck' | 'placeholder'> & {
  ref: ForwardedRef<VehicleKeyboardRef>;
}) {
  const [visible, { setTrue, setFalse }] = useBoolean(false);
  const [currentText, setCurrentText] = useSafeState(placeholder);
  const onChangeRef = useLatest(onChange);

  useImperativeHandle(ref, () => {
    return {
      focus: () => {
        setTrue();
      },
    };
  });

  useEffect(() => {
    setCurrentText(value ? value + '' : placeholder);
  }, [value, placeholder, setCurrentText]);

  /**
   * 根据type对value进行合法性校验
   */
  const handleSubmit = async (value: string) => {
    if (!VehicleReg.test(value)) {
      Toast.middle({ content: '输入的车牌格式不合法' });
      return;
    }
    try {
      const text = value;
      await onCheck?.(text);
      setCurrentText(text || placeholder);
      onChangeRef.current?.(`${text}`);
      setFalse();
    } catch (error: any) {
      Toast.middle({ content: error.message });
    }
  };

  const handleInputClear = () => {
    setCurrentText(placeholder);
    onChangeRef.current?.('');
  };

  const clearIconStyle = useAnimatedStyle(() => {
    return {
      width: !!currentText && currentText !== placeholder ? withTiming(24) : withTiming(0),
    };
  });

  return {
    visible,
    clearIconStyle,
    currentText,
    setTrue,
    setFalse,
    handleSubmit: useMemoizedFn(handleSubmit),
    handleInputClear: useMemoizedFn(handleInputClear),
  };
}
