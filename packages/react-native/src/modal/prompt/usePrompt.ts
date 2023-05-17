import { useCallback } from 'react';

import { useSafeState } from '@td-design/rn-hooks';

import useConfirm from '../confirm/useConfirm';
import { PromptProps } from '../type';

export default function usePrompt({ onOk, onCancel }: Pick<PromptProps, 'onOk' | 'onCancel'>) {
  const [value, onChange] = useSafeState();

  const okFun = useCallback(() => {
    const result = onOk?.(value);
    if (result?.then) {
      return Promise.resolve(result);
    }
    return result;
  }, [onOk, value]);

  const { visible, okBtnLoading, cancelBtnLoading, hide, handleOk, handleCancel } = useConfirm({
    onOk: okFun,
    onCancel,
  });

  return {
    value,
    visible,
    okBtnLoading,
    cancelBtnLoading,
    hide,
    onChange,
    handleOk,
    handleCancel,
  };
}
