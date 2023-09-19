import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';

import { Box } from '@td-design/react-native';
import { useSafeState } from '@td-design/rn-hooks';

import { SceneViewProps } from './type';
import usePagerView from './usePagerView';

export default function SceneView({ index, lazy, layout, children }: SceneViewProps) {
  const { addEnterListener, page } = usePagerView.useModel();

  const [isLoading, setLoading] = useSafeState(Math.abs(page - index) > 0);
  const focused = page === index;

  // Always render the route when it becomes focused
  if (isLoading && Math.abs(page - index) <= 0) {
    setLoading(false);
  }

  useEffect(() => {
    const handleEnter = (value: number) => {
      if (value === index) {
        setLoading(prev => !prev);
      }
    };

    let unsubscribe: (() => void) | undefined;
    let timer: ReturnType<typeof setTimeout>;

    if (lazy && isLoading) {
      unsubscribe = addEnterListener(handleEnter);
    } else if (isLoading) {
      timer = setTimeout(() => {
        setLoading(false);
      }, 0);
    }

    return () => {
      unsubscribe?.();
      clearTimeout(timer);
    };
  }, []);

  return (
    <Box
      flex={1}
      overflow={'hidden'}
      style={layout.width ? { width: layout.width } : focused ? StyleSheet.absoluteFill : null}
    >
      {focused || layout.width ? children({ loading: isLoading }) : null}
    </Box>
  );
}
