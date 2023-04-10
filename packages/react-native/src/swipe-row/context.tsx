import React, { PropsWithChildren, useCallback, useMemo } from 'react';

import { usePrevious, useSafeState } from '@td-design/rn-hooks';

export const SwipeRowContext = React.createContext<{
  id?: string | number;
  changeState: (id: string | number) => void;
}>({
  id: undefined,
  changeState: (id: string | number) => {
    console.log('id', id);
  },
});

export const SwipeRowContextProvider = ({ children }: PropsWithChildren<any>) => {
  const [currentId, setCurrentId] = useSafeState<string | number>('');
  const previous = usePrevious(currentId);

  const changeState = useCallback((id: string | number) => {
    setCurrentId(id);
  }, []);

  const value = useMemo(() => ({ changeState, id: previous }), [previous]);

  return <SwipeRowContext.Provider value={value}>{children}</SwipeRowContext.Provider>;
};
