import { useEffect } from 'react';
import BackgroundTimer from 'react-native-background-timer';
import useLatest from '../useLatest';
import { isIOS } from '../utils/platform';

type Func = (...args: any[]) => any;

export default function useTimeout(fn: Func, delay?: number) {
  const fnRef = useLatest(fn);

  useEffect(() => {
    if (delay === undefined || typeof delay !== 'number' || delay <= 0) return;

    let timer: number | NodeJS.Timeout;
    if (isIOS()) {
      BackgroundTimer.start();
      timer = setTimeout(() => {
        fnRef.current();
      }, delay);
    } else {
      timer = BackgroundTimer.setTimeout(() => {
        fnRef.current();
      }, delay);
    }

    return () => {
      if (isIOS()) {
        clearTimeout(timer as NodeJS.Timeout);
        BackgroundTimer.stop();
      } else {
        BackgroundTimer.clearTimeout(timer as number);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay]);
}
