import { useSafeState, useMemoizedFn } from '@td-design/rn-hooks';
import useConfirm from '../confirm/useConfirm';
import { PromptProps } from '../type';

export default function usePrompt({ onOk, onCancel }: Pick<PromptProps, 'onOk' | 'onCancel'>) {
  const [value, setValue] = useSafeState<string>();
  const result = useConfirm({ onOk, onCancel });

  return {
    value,
    onChange: useMemoizedFn(setValue),
    ...result,
  };
}
