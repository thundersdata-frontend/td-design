import React, { PropsWithChildren, useMemo } from 'react';

import { useMemoizedFn, usePrevious, useSafeState } from '@td-design/rn-hooks';

export const SwipeRowContext = React.createContext<{
  id?: string | number;
  changeState: (id: string | number) => void;
  multiple?: boolean;
}>({
  id: undefined,
  changeState: (id: string | number) => {
    console.log('id', id);
  },
  multiple: false,
});

export const SwipeRowContextProvider = ({
  children,
  multiple,
}: PropsWithChildren<{
  /** 是否允许多开 */
  multiple?: boolean;
}>) => {
  const [currentId, setCurrentId] = useSafeState<string | number>('');
  const previous = usePrevious(currentId);

  const changeState = useMemoizedFn((id: string | number) => {
    setCurrentId(id);
  });

  const value = useMemo(() => ({ changeState, id: previous, multiple }), [previous, multiple]);

  return <SwipeRowContext.Provider value={value}>{children}</SwipeRowContext.Provider>;
};
