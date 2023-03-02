import { useBoolean, useLatest, useMemoizedFn } from '@td-design/rn-hooks';

import type { ConfirmProps } from '../type';

export default function useConfirm({ onOk, onCancel }: Pick<ConfirmProps, 'onOk' | 'onCancel'>) {
  const onOkRef = useLatest(onOk);
  const onCancelRef = useLatest(onCancel);

  const [visible, { setFalse }] = useBoolean(true);

  /** 确定操作 */
  const handleOk = () => {
    const originPress = onOkRef.current || function () {};
    const res = originPress();
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
    visible,
    hide: setFalse,
    handleOk: useMemoizedFn(handleOk),
    handleCancel: useMemoizedFn(handleCancel),
  };
}
