import { useMemo, useRef } from 'react';

type Func = (...args: any[]) => any;

/**
 * 持久化 function 的 Hook，理论上，可以使用 useMemoizedFn 完全代替 useCallback。
 * 在某些场景中，我们需要使用 useCallback 来记住一个函数，但是在第二个参数 deps 变化时，会重新生成函数，导致函数地址变化。
 * 使用 useMemoizedFn，可以省略第二个参数 deps，同时保证函数地址永远不会变化。
 * @param fn 函数
 * @returns
 */
export default function useMemoizedFn<T extends Func>(fn: T) {
  if (process.env.NODE_ENV === 'development') {
    if (typeof fn !== 'function') {
      console.error(`useMemoizedFn expected parameter is a function, got ${typeof fn}`);
    }
  }

  const fnRef = useRef<T>(fn);
  // https://github.com/alibaba/hooks/issues/728
  fnRef.current = useMemo(() => fn, [fn]);

  const memoizedFn = useRef<T>();
  if (!memoizedFn.current) {
    memoizedFn.current = function (...args) {
      return fnRef.current.apply(null, args);
    } as T;
  }

  return memoizedFn.current;
}
