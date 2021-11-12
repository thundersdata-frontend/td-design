import { isFunction } from 'lodash';
import { useState } from 'react';
import { useMemoizedFn } from '..';

export default function useSetState<T extends Record<string, any>>(initialState: T = {} as T) {
  const [state, setState] = useState<T>(initialState);

  const setMergeState = (patch: T) => {
    setState(prevState => ({ ...prevState, ...(isFunction(patch) ? patch(prevState) : patch) }));
  };

  return [state, useMemoizedFn(setMergeState)] as const;
}
