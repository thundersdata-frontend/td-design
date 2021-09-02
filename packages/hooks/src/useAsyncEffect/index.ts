import { useEffect, DependencyList } from 'react';

/**
 * useEffect 支持Promise异步函数。
 * @param effect 待执行的异步函数
 * @param deps 依赖
 */
export default function useAsyncEffect(effect: () => Promise<void>, deps: DependencyList) {
  useEffect(() => {
    async function execute() {
      await effect();
    }
    execute();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
