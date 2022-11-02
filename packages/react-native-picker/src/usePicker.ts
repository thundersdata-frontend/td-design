import { useBoolean, useLatest, useMemoizedFn, useSafeState, useUpdateEffect } from '@td-design/rn-hooks';
import { ForwardedRef, useImperativeHandle } from 'react';
import { Keyboard } from 'react-native';
import { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { CascadePickerItemProps, ItemValue, PickerProps } from './picker/type';
import { PickerRef } from './type';
import { transformValueToLabel } from './utils';

function getText(
  data: CascadePickerItemProps[] | CascadePickerItemProps[][],
  value?: ItemValue[],
  cascade?: boolean,
  placeholder?: string
) {
  if (value) {
    return transformValueToLabel(data, value, cascade);
  }
  return placeholder;
}

export default function usePicker({
  data,
  cascade = false,
  value,
  onChange,
  placeholder = '请选择',
  ref,
}: Pick<PickerProps, 'value' | 'onChange' | 'data' | 'cascade'> & {
  placeholder?: string;
  ref: ForwardedRef<PickerRef>;
}) {
  const [state, setState] = useSafeState(value);
  const [currentText, setCurrentText] = useSafeState(getText(data, value, cascade, placeholder));
  const [visible, { setTrue, setFalse }] = useBoolean(false);
  const onChangeRef = useLatest(onChange);

  useImperativeHandle(ref, () => {
    return {
      focus: () => {
        setTrue();
      },
    };
  });

  useUpdateEffect(() => {
    const text = getText(data, value, cascade, placeholder);
    setCurrentText(text);
    setState(value);
  }, [value]);

  const handlePress = () => {
    Keyboard.dismiss();
    setTrue();
  };

  const handleChange = (value?: ItemValue[]) => {
    const text = getText(data, value, cascade, placeholder);
    setCurrentText(text);
    setState(value);

    onChangeRef.current?.(value);
  };

  const handleInputClear = () => {
    setCurrentText(placeholder);
    setState(undefined);
    onChangeRef.current?.(undefined);
  };

  const clearIconStyle = useAnimatedStyle(() => {
    return {
      width: !!currentText && currentText !== placeholder ? withTiming(24) : withTiming(0),
    };
  });

  return {
    state,
    currentText,
    visible,
    setFalse,
    clearIconStyle,
    handlePress: useMemoizedFn(handlePress),
    handleChange: useMemoizedFn(handleChange),
    handleInputClear: useMemoizedFn(handleInputClear),
  };
}
