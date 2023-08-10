import { useState } from 'react';

import useMemoizedFn from '../useMemoizedFn';

/**
 * 一个可以管理 Set 类型状态的 Hook。
 * @param initialValue 初始值
 * @returns
 */
export default function useSet<K>(initialValue?: Iterable<K>) {
  const getInitValue = () => new Set(initialValue);

  const [set, setSet] = useState<Set<K>>(getInitValue);

  const add = (key: K) => {
    if (set.has(key)) {
      return;
    }
    setSet(prevSet => {
      const temp = new Set(prevSet);
      temp.add(key);
      return temp;
    });
  };

  const remove = (key: K) => {
    if (!set.has(key)) {
      return;
    }
    setSet(prevSet => {
      const temp = new Set(prevSet);
      temp.delete(key);
      return temp;
    });
  };

  const reset = () => setSet(getInitValue());

  const actions = {
    add: useMemoizedFn(add),
    remove: useMemoizedFn(remove),
    reset: useMemoizedFn(reset),
  };

  return [set, actions] as const;
}
