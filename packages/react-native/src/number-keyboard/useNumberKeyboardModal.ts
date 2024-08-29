import { useEffect } from 'react';

import { useBoolean, useMemoizedFn, useSafeState } from '@td-design/rn-hooks';

import { NumberKeyboardModalProps } from './type';

export default function useNumberKeyboardModal({
  value = '',
  onPress,
  onDelete,
  onSubmit,
}: Pick<NumberKeyboardModalProps, 'value' | 'onPress' | 'onDelete' | 'onSubmit'>) {
  const [text, setText] = useSafeState(value);
  const [visible, visibleAction] = useBoolean(true);

  useEffect(() => {
    setText(value);
  }, [value]);

  /** 点击数字，第一次点击的时候，需要把之前的清掉 */
  const handleChange = (key: string) => {
    setText(text => text + key);
    onPress?.(key);
  };

  const handleInputClear = () => {
    setText('');
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
    visible,

    setFalse: visibleAction.setFalse,
    handleInputClear: useMemoizedFn(handleInputClear),
    handleChange: useMemoizedFn(handleChange),
    handleSubmit: useMemoizedFn(handleSubmit),
    handleDelete: useMemoizedFn(handleDelete),
  };
}
