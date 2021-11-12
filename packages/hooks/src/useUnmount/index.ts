import { useEffect } from 'react';
import useLatest from '../useLatest';

export default function useUnmount(fn: Func) {
  if (process.env.NODE_ENV !== 'production') {
    if (typeof fn !== 'function') {
      throw new Error(`useUnmount expected parameter is a function, got ${typeof fn}`);
    }
  }

  const fnRef = useLatest(fn);

  useEffect(
    () => () => {
      fnRef.current();
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
}
