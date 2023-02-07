import { useModal } from '@ebay/nice-modal-react';
import { useLatest, useMemoizedFn, useSafeState } from '@td-design/rn-hooks';

import { PromptProps } from '../type';

export default function usePrompt({ onOk, onCancel }: Pick<PromptProps, 'onOk' | 'onCancel'>) {
  const [value, setValue] = useSafeState<string>();
  const modal = useModal();
  const onOkRef = useLatest(onOk);
  const onCancelRef = useLatest(onCancel);

  /** 确定操作 */
  const handleOk = () => {
    const originPress = onOkRef.current || function () {};
    const res = originPress(value);
    if (res && res.then) {
      res.then(() => {
        modal.hide();
      });
    } else {
      modal.hide();
    }
  };

  /** 取消操作 */
  const handleCancel = () => {
    const originPress = onCancelRef.current || function () {};
    const res = originPress();
    if (res && res.then) {
      res.then(() => {
        modal.hide();
      });
    } else {
      modal.hide();
    }
  };

  return {
    value,
    modal,
    onChange: useMemoizedFn(setValue),
    handleOk: useMemoizedFn(handleOk),
    handleCancel: useMemoizedFn(handleCancel),
  };
}
