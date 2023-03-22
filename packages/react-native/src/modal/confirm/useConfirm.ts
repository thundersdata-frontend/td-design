import { useMemoizedFn, useSafeState } from '@td-design/rn-hooks';

import type { ConfirmProps } from '../type';

export default function useConfirm({ onOk, onCancel }: Pick<ConfirmProps, 'onOk' | 'onCancel'>) {
  const [visible, setVisible] = useSafeState(true);
  const [okBtnLoading, setOkBtnLoading] = useSafeState(false);
  const [cancelBtnLoading, setCancelBtnLoading] = useSafeState(false);

  /** 确定操作 */
  const handleOk = async () => {
    if (!onOk) {
      setVisible(false);
      return;
    }
    try {
      setOkBtnLoading(true);
      await onOk();
      setOkBtnLoading(false);
      setVisible(false);
    } catch (error) {
      setOkBtnLoading(false);
    }
  };

  /** 取消操作 */
  const handleCancel = async () => {
    if (!onCancel) {
      setVisible(false);
      return;
    }
    try {
      setCancelBtnLoading(true);
      await onCancel();
      setCancelBtnLoading(false);
      setVisible(false);
    } catch (error) {
      setCancelBtnLoading(false);
    }
  };

  return {
    visible,
    okBtnLoading,
    cancelBtnLoading,
    hide: () => setVisible(false),
    handleOk: useMemoizedFn(handleOk),
    handleCancel: useMemoizedFn(handleCancel),
  };
}
