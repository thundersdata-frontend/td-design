import { useEffect, useRef } from 'react';

import { isNumber } from 'lodash-es';

import useMemoizedFn from '../useMemoizedFn';

type Func = (...args: any[]) => any;

export default function useTimeout(fn: Func, delay?: number) {
  const timerCallback = useMemoizedFn(fn);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (!isNumber(delay) || delay < 0) return;

    timer.current = setTimeout(() => {
      timerCallback();
    }, delay);

    return clear;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay]);

  const clear = useMemoizedFn(() => {
    if (timer.current) {
      clearInterval(timer.current);
    }
  });

  return clear;
}
