import { Keyboard } from 'react-native';

import { useMemoizedFn, useSafeState } from '@td-design/rn-hooks';

import useConfirm from '../confirm/useConfirm';
import { PromptProps } from '../type';

export default function usePrompt({ onOk, onCancel }: Pick<PromptProps, 'onOk' | 'onCancel'>) {
  const [value, onChange] = useSafeState();

  const okFun = useMemoizedFn(async () => {
    const result = await onOk?.(value);
    return result;
  });

  const {
    visible,
    okBtnLoading,
    cancelBtnLoading,
    hide,
    handleOk: _handleOk,
    handleCancel,
  } = useConfirm({
    onOk: okFun,
    onCancel,
  });

  const handleOk = useMemoizedFn(() => {
    Keyboard.dismiss();
    _handleOk();
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
