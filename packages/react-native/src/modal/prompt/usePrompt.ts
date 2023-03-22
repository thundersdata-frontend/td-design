import { useSafeState } from '@td-design/rn-hooks';

import useConfirm from '../confirm/useConfirm';
import { PromptProps } from '../type';

export default function usePrompt({ onOk, onCancel }: Pick<PromptProps, 'onOk' | 'onCancel'>) {
  const [value, onChange] = useSafeState();

  const { visible, okBtnLoading, cancelBtnLoading, hide, handleOk, handleCancel } = useConfirm({ onOk, onCancel });

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
