import { useSafeState, useMemoizedFn, useBoolean, useLatest } from '@td-design/rn-hooks';
import { PromptProps } from '../type';

export default function usePrompt({ onOk, onCancel }: Pick<PromptProps, 'onOk' | 'onCancel'>) {
  const [value, setValue] = useSafeState<string>();
  const [visible, { setFalse }] = useBoolean(true);
  const onOkRef = useLatest(onOk);
  const onCancelRef = useLatest(onCancel);

  /** 确定操作 */
  const handleOk = () => {
    const originPress = onOkRef.current || function () {};
    const res = originPress(value);
    if (res && res.then) {
      res.then(() => {
        setFalse();
      });
    } else {
      setFalse();
    }
  };

  /** 取消操作 */
  const handleCancel = () => {
    const originPress = onCancelRef.current || function () {};
    const res = originPress();
    if (res && res.then) {
      res.then(() => {
        setFalse();
      });
    } else {
      setFalse();
    }
  };

  return {
    value,
    visible,
    setFalse,
    onChange: useMemoizedFn(setValue),
    handleOk: useMemoizedFn(handleOk),
    handleCancel: useMemoizedFn(handleCancel),
  };
}
