import { useMemoizedFn, useSafeState } from '@td-design/rn-hooks';

import { ImperativeModalChildrenProps } from '../modal/type';
import { VehicleKeyboardModalProps, VehicleKeyboardType } from './type';

export default function useVehicleKeyboardModal({
  value = '',
  onPress,
  onDelete,
  onSubmit,
  closeModal,
}: Pick<
  ImperativeModalChildrenProps<VehicleKeyboardModalProps>,
  'value' | 'onPress' | 'onDelete' | 'onSubmit' | 'closeModal'
>) {
  const [text, setText] = useSafeState(value);

  const type = text.length === 0 ? 'provinces' : ('vehicleNum' as VehicleKeyboardType);
  const textArr = text.split('');

  const handleChange = (key: string) => {
    if (text.length > 8) {
      return;
    }
    setText(text => text + key);
    onPress?.(key);
  };

  const handleDelete = () => {
    setText(text => (text.length > 0 ? text.slice(0, text.length - 1) : ''));
    onDelete?.();
  };

  const handleSubmit = () => {
    onSubmit?.(text);
    closeModal?.();
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
