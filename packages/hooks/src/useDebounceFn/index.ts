import { debounce } from 'lodash-es';

import useCreation from '../useCreation';
import type { DebounceOptions } from '../useDebounce/DebounceOptions';
import useMemoizedFn from '../useMemoizedFn';
import useUnmount from '../useUnmount';

type noop = (...args: any) => any;

/**
 * 用来处理防抖函数的 Hook。
 * @param fn 需要防抖的函数
 * @param options 配置防抖的行为
 */
export default function useDebounceFn<T extends noop>(fn: T, options?: DebounceOptions) {
  if (__DEV__) {
    if (typeof fn !== 'function') {
      throw new Error(`useDebounceFn expected parameter is a function, got ${typeof fn}`);
    }
  }

  const fnRef = useMemoizedFn(fn);

  const wait = options?.wait ?? 1000;

  const debounced = useCreation(
    () =>
      debounce(
        (...args: Parameters<T>): ReturnType<T> => {
          return fnRef(...args);
        },
        wait,
        options
      ),
    []
  );

  useUnmount(() => {
    debounced.cancel();
  });

  return {
    run: debounced,
    cancel: debounced.cancel,
    flush: debounced.flush,
  };
}
