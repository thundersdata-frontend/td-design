import { useSafeState, useUpdateEffect, useLatest, useMemoizedFn } from '@td-design/rn-hooks';
import { NumberKeyboardModalProps } from './type';

export default function useNumberKeyboardModal({
  value = '',
  onPress,
  onDelete,
  onSubmit,
}: Pick<NumberKeyboardModalProps, 'value' | 'onPress' | 'onDelete' | 'onSubmit'>) {
  const [text, setText] = useSafeState(value);
  const onPressRef = useLatest(onPress);
  const onDeleteRef = useLatest(onDelete);
  const onSubmitRef = useLatest(onSubmit);

  useUpdateEffect(() => {
    setText(value);
  }, [value]);

  const handleChange = (key: string) => {
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
    handleChange: useMemoizedFn(handleChange),
    handleSubmit: useMemoizedFn(handleSubmit),
    handleDelete: useMemoizedFn(handleDelete),
  };
}
