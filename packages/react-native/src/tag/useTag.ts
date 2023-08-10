import { useBoolean, useMemoizedFn } from '@td-design/rn-hooks';

import type { TagProps } from '.';

export default function useTag({
  selected = false,
  disabled = false,
  selectable = true,
  onClose,
  onSelect,
}: Pick<TagProps, 'selected' | 'selectable' | 'disabled' | 'onClose' | 'onSelect'>) {
  const [checked, { set: setChecked }] = useBoolean(selected);
  const [closed, { set: setClosed }] = useBoolean(false);

  /** 点击事件 */
  const handlePress = () => {
    if (disabled || !selectable) return;

    setChecked(!checked);
    onSelect?.(!checked);
  };

  /** 删除事件 */
  const handleDelete = () => {
    setClosed(!closed);
    onClose?.();
  };

  return {
    checked,
    closed,
    handlePress: useMemoizedFn(handlePress),
    handleDelete: useMemoizedFn(handleDelete),
  };
}
