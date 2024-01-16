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
  const [visible, { setFalse }] = useBoolean(true);

  useEffect(() => {
    setText(value);
  }, [value]);

  const handleChange = (key: string) => {
    setText(text => text + key);
    onPress?.(key);
  };

  const handleDelete = () => {
    setText(text => (text.length > 0 ? text.slice(0, text.length - 1) : ''));
    onDelete?.();
  };

  const handleSubmit = () => {
    onSubmit?.(text);
    setFalse();
  };

  return {
    text,
    visible,
    setFalse,
    handleChange: useMemoizedFn(handleChange),
    handleSubmit: useMemoizedFn(handleSubmit),
    handleDelete: useMemoizedFn(handleDelete),
  };
}
