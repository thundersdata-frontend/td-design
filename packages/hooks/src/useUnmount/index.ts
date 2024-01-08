import { useEffect } from 'react';

import useMemoizedFn from '../useMemoizedFn';

type Func = (...args: any[]) => any;

export default function useUnmount(fn: Func) {
  if (__DEV__) {
    if (typeof fn !== 'function') {
      throw new Error(`useUnmount expected parameter is a function, got ${typeof fn}`);
    }
  }

  const fnRef = useMemoizedFn(fn);

  useEffect(
    () => fnRef,

    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
}
