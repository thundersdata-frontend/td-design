import { useEffect } from 'react';

/**
 * 只在组件 mount 时执行的 Hook。也就是说 fn 函数只会执行一次
 * @param fn mount 时执行的函数
 */
export default function useMount(fn: Func) {
  if (process.env.NODE_ENV === 'development') {
    if (typeof fn !== 'function') {
      console.error(`useMount expected parameter is a function, got ${typeof fn}`);
    }
  }

  useEffect(() => {
    fn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
