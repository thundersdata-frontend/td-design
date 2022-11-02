import { useBoolean, useLatest, useMemoizedFn, useSafeState } from '@td-design/rn-hooks';

import type { PasswordProps } from '.';

export default function usePassword({
  clean = true,
  length = 6,
  onDone,
  onChange,
}: Pick<PasswordProps, 'clean' | 'length' | 'onDone' | 'onChange'>) {
  const [password, setPassword] = useSafeState('');
  const [visible, { setTrue, setFalse }] = useBoolean(false);

  const onDoneRef = useLatest(onDone);
  const onChangeRef = useLatest(onChange);

  /** 显示键盘 */
  const show = () => {
    if (clean) {
      setPassword('');
    }
    setTrue();
  };

  /** 隐藏键盘 */
  const hide = () => {
    setFalse();
  };

  /** 键盘删除事件 */
  const handleDelete = () => {
    const nextPassword = password.substring(0, password.length - 1);
    setPassword(nextPassword);
    onChangeRef.current?.(nextPassword);
  };

  /** 按键 */
  const combineText = (text: string | number) => {
    const nextPassword = password + text;
    if (nextPassword.length <= length) {
      setPassword(nextPassword);
      onChangeRef.current?.(nextPassword);
      if (nextPassword.length === length) {
        onDoneRef.current?.(nextPassword);
        hide();
      }
    }
  };

  /** 键盘提交事件 */
  const handleSubmit = () => {
    onDoneRef.current?.(password);
    hide();
  };

  /** 清除密码 */
  const clear = () => {
    setPassword('');
  };

  return {
    password,
    show,
    clear,
    hide,
    visible,
    setFalse: useMemoizedFn(setFalse),
    combineText: useMemoizedFn(combineText),
    handleSubmit: useMemoizedFn(handleSubmit),
    handleDelete: useMemoizedFn(handleDelete),
  };
}
