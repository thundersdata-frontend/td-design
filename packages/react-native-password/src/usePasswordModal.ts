import { useBoolean, useLatest, useMemoizedFn, useSafeState } from '@td-design/rn-hooks';
import { PasswordModalProps } from './PasswordModal';

export default function usePasswordModal({ length = 6, onDone }: Pick<PasswordModalProps, 'length' | 'onDone'>) {
  const [password, setPassword] = useSafeState('');
  const [visible, { setFalse }] = useBoolean(true);

  const onDoneRef = useLatest(onDone);

  /** 键盘删除事件 */
  const handleDelete = () => {
    const nextPassword = password.substring(0, password.length - 1);
    setPassword(nextPassword);
  };
  /** 按键 */
  const combineText = (text: string | number) => {
    const nextPassword = password + text;
    if (nextPassword.length <= length) {
      setPassword(nextPassword);
      if (nextPassword.length === length) {
        onDoneRef.current?.(nextPassword);
        setFalse();
      }
    }
  };
  /** 键盘提交事件 */
  const handleSubmit = () => {
    onDoneRef.current?.(password);
    setFalse();
  };

  return {
    password,
    visible,
    setFalse: useMemoizedFn(setFalse),
    combineText: useMemoizedFn(combineText),
    handleSubmit: useMemoizedFn(handleSubmit),
    handleDelete: useMemoizedFn(handleDelete),
  };
}
