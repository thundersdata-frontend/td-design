import { useEffect } from 'react';
import BackgroundTimer from 'react-native-background-timer';

import useLatest from '../useLatest';
import { isIOS } from '../utils/platform';

type Func = (...args: any[]) => any;

export default function useInterval(fn: Func, delay?: number, options?: { immediate: boolean }) {
  const immediate = options?.immediate ?? false;
  const fnRef = useLatest(fn);

  useEffect(() => {
    if (delay === undefined || typeof delay !== 'number' || delay <= 0) return;
    if (immediate) {
      fnRef.current();
    }
    let timer: number | NodeJS.Timer;
    if (isIOS()) {
      BackgroundTimer.start();
      timer = setInterval(() => {
        fnRef.current();
      }, delay);
    } else {
      timer = BackgroundTimer.setInterval(() => {
        fnRef.current();
      }, delay);
    }

    return () => {
      if (isIOS()) {
        clearInterval(timer as NodeJS.Timer);
        BackgroundTimer.stop();
      } else {
        BackgroundTimer.clearInterval(timer as number);
      }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay]);
}
