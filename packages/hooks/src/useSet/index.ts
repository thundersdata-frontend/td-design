import { useState } from 'react';
import useMemoizedFn from '../useMemoizedFn';

/**
 * 一个可以管理 Set 类型状态的 Hook。
 * @param initialValue 初始值
 * @returns
 */
export default function useSet<K>(initialValue?: Iterable<K>) {
  const getInitValue = () => {
    return initialValue === undefined ? new Set<K>() : new Set(initialValue);
  };

  const [set, setSet] = useState<Set<K>>(() => getInitValue());

  const add = (key: K) => {
    if (set.has(key)) return;
    setSet(prev => {
      const temp = new Set(prev);
      temp.add(key);
      return temp;
    });
  };

  const remove = (key: K) => {
    if (!set.has(key)) return;
    setSet(prev => {
      const temp = new Set(prev);
      temp.delete(key);
      return temp;
    });
  };

  const clear = () => {
    setSet(new Set());
  };

  const reset = () => {
    setSet(getInitValue());
  };

  return [
    set,
    {
      add: useMemoizedFn(add),
      remove: useMemoizedFn(remove),
      clear: useMemoizedFn(clear),
      reset: useMemoizedFn(reset),
    },
  ] as const;
}
