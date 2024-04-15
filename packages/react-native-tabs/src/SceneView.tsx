import React, { useEffect } from 'react';
import { View } from 'react-native';

import { useSafeState } from '@td-design/rn-hooks';

export default function SceneView({
  lazy,
  currentPage,
  index,
  children,
}: {
  lazy: boolean;
  currentPage: number;
  index: number;
  children: (props: { loading: boolean }) => React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useSafeState(lazy && Math.abs(currentPage - index) > 0);

  if (isLoading && Math.abs(currentPage - index) <= 0 && lazy) {
    setIsLoading(false);
  }

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (!lazy && isLoading) {
      timer = setTimeout(() => {
        setIsLoading(false);
      }, 0);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [lazy, isLoading]);

  const focused = currentPage === index;

  return (
    <View
      accessibilityElementsHidden={!focused}
      importantForAccessibility={focused ? 'auto' : 'no-hide-descendants'}
      style={{
        flex: 1,
        overflow: 'hidden',
      }}
    >
      {children({ loading: isLoading })}
    </View>
  );
}
