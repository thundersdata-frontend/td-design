import { useCallback, useRef } from 'react';

/**
 * 用于给一个异步函数增加竞态锁，防止并发执行。
 * 可以用在诸如表单提交的场景下，保证即便多次点击提交，在前一次结果未完成之前，后续操作会被忽略
 */
export default function useLockFn<P extends any[] = any[], U = any>(fn: (...args: P) => Promise<U>) {
  const lockRef = useRef(false);

  return useCallback(
    async (...args: P) => {
      if (lockRef.current) return;
      lockRef.current = true;

      try {
        const result = await fn(...args);
        lockRef.current = false;
        return result;
      } catch (error) {
        lockRef.current = false;
        throw error;
      }
    },
    [fn]
  );
}
