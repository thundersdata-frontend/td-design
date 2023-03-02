import { useEffect, useRef } from 'react';

import useLatest from '../useLatest';

type Func = (...args: any[]) => any;

export default function useInterval(fn: Func, delay?: number, options?: { immediate: boolean }) {
  const immediate = options?.immediate ?? false;
  const fnRef = useLatest(fn);
  const timer = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    if (delay === undefined || typeof delay !== 'number' || delay <= 0) return;
    if (immediate) {
      fnRef.current();
    }
    timer.current = setInterval(() => {
      fnRef.current();
    }, delay);

    return () => clearInterval(timer.current);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay]);
}
