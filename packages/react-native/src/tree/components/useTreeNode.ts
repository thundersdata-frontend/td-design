import { useDerivedValue, withTiming } from 'react-native-reanimated';

import { useMemoizedFn } from '@td-design/rn-hooks';

import { TreeNodeProps } from '../type';

export function useTreeNode({
  expanded = false,
  eventKey,
  title,
  checked = false,
  disabled,
  onCheck,
  data,
  onClick,

  show,
}: TreeNodeProps) {
  const progress = useDerivedValue(() => (expanded ? withTiming(1) : withTiming(0)));
  const heightProgress = useDerivedValue(() => (!!show ? withTiming(1) : withTiming(0)));

  const handlerCheck = () => {
    onCheck?.({ expanded, key: data.key, eventKey, title, checked, disabled });
  };

  return { progress, heightProgress, handlerCheck: useMemoizedFn(handlerCheck), onClick };
}
