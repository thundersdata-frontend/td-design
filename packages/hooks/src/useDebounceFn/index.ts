import debounce from 'lodash.debounce';
import useCreation from '../useCreation';
import useLatest from '../useLatest';
import useMemoizedFn from '../useMemoizedFn';
import useUnmount from '../useUnmount';

/**
 * 用来处理防抖函数的 Hook。
 * @param fn 需要防抖的函数
 * @param options 配置防抖的行为
 */
export default function useDebounceFn<T extends Func>(fn: T, options?: DebounceOptions) {
  if (process.env.NODE_ENV !== 'production') {
    if (typeof fn !== 'function') {
      throw new Error(`useDebounceFn expected parameter is a function, got ${typeof fn}`);
    }
  }

  const fnRef = useLatest(fn);

  const wait = options?.wait ?? 1000;

  const debounced = useCreation(
    () =>
      debounce<T>(
        ((...args: any[]) => {
          return fnRef.current(...args);
        }) as T,
        wait,
        options
      ),
    []
  );

  useUnmount(() => {
    debounced.cancel();
  });

  return {
    run: debounced as unknown as T,
    cancel: useMemoizedFn(debounced.cancel),
    flush: useMemoizedFn(debounced.flush),
  };
}
