import { useEffect, useRef, useState } from 'react';

import useAppState from '../useAppState';
import useMemoizedFn from '../useMemoizedFn';

export default function useCountDown(seconds) {
  const appState = useAppState();
  const timer = useRef<ReturnType<typeof setInterval>>();
  const [target, setTarget] = useState<Date | null>(null);
  const [count, setCount] = useState(0);

  const start = useMemoizedFn(() => {
    setTarget(add(new Date(), seconds));
  });

  const stop = useMemoizedFn(() => {
    setTarget(null);
    setCount(0);
  });

  useEffect(() => {
    if (target === null || appState !== 'active') return;

    setCount(diff(new Date(), target));

    timer.current = setInterval(() => {
      setCount(diff(new Date(), target));
    }, 1000);

    return () => {
      if (timer.current) {
        clearInterval(timer.current);
        timer.current = undefined;
      }
    };
  }, [target]);

  useEffect(() => {
    if (count === 0) {
      stop();
    }
  }, [count, stop]);

  return {
    count,

    start,
    stop,
  };
}

function add(date: Date, seconds: number) {
  return new Date(date.getTime() + seconds * 1000);
}

function diff(now: Date, target: Date) {
  return Math.max(Math.trunc((target.getTime() - now.getTime()) / 1000 + 0.5), 0);
}
