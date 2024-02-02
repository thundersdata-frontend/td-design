import { useEffect, useRef } from 'react';

import { useBoolean, useMemoizedFn, useSafeState } from '@td-design/rn-hooks';

import { VehicleKeyboardModalProps, VehicleKeyboardType } from './type';

export default function useVehicleKeyboardModal({
  value = '',
  onPress,
  onDelete,
  onSubmit,
}: Pick<VehicleKeyboardModalProps, 'value' | 'onPress' | 'onDelete' | 'onSubmit'>) {
  const [text, setText] = useSafeState(value);
  const [visible, visibleAction] = useBoolean(true);
  const isFirstPress = useRef(true);

  const type = text.length === 0 ? 'provinces' : ('vehicleNum' as VehicleKeyboardType);
  const textArr = text.split('');

  useEffect(() => {
    setText(value);
  }, [setText, value]);

  const handleChange = (key: string) => {
    if (text.length > 8) {
      return;
    }
    if (isFirstPress.current) {
      setText(key);
      isFirstPress.current = false;
    } else {
      setText(text => text + key);
    }
    onPress?.(key);
  };

  const handleDelete = () => {
    setText(text => (text.length > 0 ? text.slice(0, text.length - 1) : ''));
    onDelete?.();
  };

  const handleSubmit = () => {
    onSubmit?.(text);
    visibleAction.setFalse();
  };

  return {
    text,
    type,
    textArr,
    visible,
    setFalse: visibleAction.setFalse,
    handleChange: useMemoizedFn(handleChange),
    handleSubmit: useMemoizedFn(handleSubmit),
    handleDelete: useMemoizedFn(handleDelete),
  };
}
