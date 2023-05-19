import { useEffect } from 'react';

import { useLatest, useMemoizedFn, useSafeState } from '@td-design/rn-hooks';

import { VehicleKeyboardModalProps, VehicleKeyboardType } from './type';

export default function useVehicleKeyboardModal({
  value = '',
  onPress,
  onDelete,
  onSubmit,
}: Pick<VehicleKeyboardModalProps, 'value' | 'onPress' | 'onDelete' | 'onSubmit'>) {
  const [text, setText] = useSafeState(value);
  const onPressRef = useLatest(onPress);
  const onDeleteRef = useLatest(onDelete);
  const onSubmitRef = useLatest(onSubmit);

  const type = text.length === 0 ? 'provinces' : ('vehicleNum' as VehicleKeyboardType);
  const textArr = text.split('');

  useEffect(() => {
    setText(value);
  }, [setText, value]);

  const handleChange = (key: string) => {
    if (text.length > 8) {
      return;
    }
    setText(text => text + key);
    onPressRef.current?.(key);
  };

  const handleDelete = () => {
    setText(text => (text.length > 0 ? text.slice(0, text.length - 1) : ''));
    onDeleteRef.current?.();
  };

  const handleSubmit = () => {
    onSubmitRef.current?.(text);
  };

  return {
    text,
    type,
    textArr,
    handleChange: useMemoizedFn(handleChange),
    handleSubmit: useMemoizedFn(handleSubmit),
    handleDelete: useMemoizedFn(handleDelete),
  };
}
