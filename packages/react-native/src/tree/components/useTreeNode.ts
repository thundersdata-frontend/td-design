import { useAnimatedStyle, useDerivedValue, withTiming } from 'react-native-reanimated';
import { mix } from 'react-native-redash';

import { useLatest, useMemoizedFn } from '@td-design/rn-hooks';

import helpers from '../../helpers';
import { TreeNodeProps } from '../type';

const { px } = helpers;

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
  const onCheckRef = useLatest(onCheck);
  const onClickRef = useLatest(onClick);
  const progress = useDerivedValue(() => (expanded ? withTiming(1) : withTiming(0)));
  const heightProgress = useDerivedValue(() => (!!show ? withTiming(1) : withTiming(0)));

  // tree item 高度变化
  const height = px(55);
  const style = useAnimatedStyle(() => {
    return {
      height: height * mix(heightProgress.value, 0, 1),
    };
  });

  const handlerCheck = () => {
    onCheckRef.current?.({ expanded, key: data.key, eventKey, title, checked, disabled });
  };

  return { progress, heightProgress, style, handlerCheck: useMemoizedFn(handlerCheck), onClick: onClickRef.current };
}
