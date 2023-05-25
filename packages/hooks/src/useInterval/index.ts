import { useEffect, useRef } from 'react';

import { isNumber } from 'lodash-es';

import useMemoizedFn from '../useMemoizedFn';

type Func = (...args: any[]) => any;

export default function useInterval(fn: Func, delay?: number, options?: { immediate: boolean }) {
  const immediate = options?.immediate ?? false;

  const timerCallback = useMemoizedFn(fn);
  const timer = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    if (!isNumber(delay) || delay < 0) return;
    if (immediate) {
      timerCallback();
    }
    timer.current = setInterval(timerCallback, delay);

    return clear;
  }, [delay, immediate]);

  const clear = useMemoizedFn(() => {
    if (timer.current) {
      clearInterval(timer.current);
    }
  });

  return clear;
}
