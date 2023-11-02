import { LayoutChangeEvent } from 'react-native';

import { useSafeState } from '@td-design/rn-hooks';

export default function useBadge() {
  const [layout, setLayout] = useSafeState({ width: 0, height: 0 });
  const [badgeOffset, setBadgeOffset] = useSafeState({
    top: 0,
    right: 0,
  });

  const onBadgeLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    const newX = Math.round(-width / 2);
    const newY = Math.round(-height / 2);

    setLayout({ width, height });

    if (badgeOffset.top !== newY || badgeOffset.right !== newX) {
      setBadgeOffset({ top: newY, right: newX });
    }
  };

  return {
    badgeOffset,
    layout,
    onBadgeLayout,
  };
}
