import { useEffect, useRef } from 'react';

import useLatest from '../useLatest';

type Func = (...args: any[]) => any;

export default function useTimeout(fn: Func, delay?: number) {
  const fnRef = useLatest(fn);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (delay === undefined || typeof delay !== 'number' || delay <= 0) return;

    timer.current = setTimeout(() => {
      fnRef.current();
    }, delay);

    return () => clearTimeout(timer.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay]);
}
