import React, { PropsWithChildren } from 'react';

import { usePrevious, useSafeState } from '@td-design/rn-hooks';

export const SwipeRowContext = React.createContext<{
  id?: string | number;
  changeState: (id: string | number) => void;
}>({
  id: undefined,
  changeState: () => {},
});

export const SwipeRowContextProvider = ({ children }: PropsWithChildren<any>) => {
  const [currentId, setCurrentId] = useSafeState<string | number>('');
  const previous = usePrevious(currentId);

  const changeState = (id: string | number) => {
    setCurrentId(id);
  };

  return <SwipeRowContext.Provider value={{ changeState, id: previous }}>{children}</SwipeRowContext.Provider>;
};
