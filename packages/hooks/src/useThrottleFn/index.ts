import throttle from 'lodash.throttle';
import useCreation from '../useCreation';
import useLatest from '../useLatest';
import useUnmount from '../useUnmount';
import type { ThrottleOptions } from '../useThrottle/ThrottleOptions';

type noop = (...args: any) => any;

/**
 * 用来处理节流函数的 Hook。
 * @param fn 需要节流的函数
 * @param options 配置节流的行为
 */
export default function useThrottleFn<T extends noop>(fn: T, options?: ThrottleOptions) {
  if (process.env.NODE_ENV !== 'production') {
    if (typeof fn !== 'function') {
      throw new Error(`useThrottleFn expected parameter is a function, got ${typeof fn}`);
    }
  }

  const fnRef = useLatest(fn);

  const wait = options?.wait ?? 1000;

  const throttled = useCreation(
    () =>
      throttle(
        (...args: Parameters<T>): ReturnType<T> => {
          return fnRef.current(...args);
        },
        wait,
        options
      ),
    []
  );

  useUnmount(() => {
    throttled.cancel();
  });

  return {
    run: throttled,
    cancel: throttled.cancel,
    flush: throttled.flush,
  };
}
