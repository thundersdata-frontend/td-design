import { useState } from 'react';
import useMemoizedFn from '../useMemoizedFn';

/**
 * 一个可以管理 Map 类型状态的 Hook。
 * @param initialValue 初始值
 * @returns
 */
export default function useMap<K = any, T = any>(initialValue?: Iterable<readonly [K, T]>) {
  const getInitValue = () => {
    return initialValue === undefined ? new Map() : new Map(initialValue);
  };

  const [map, setMap] = useState<Map<K, T>>(() => getInitValue());

  const get = (key: K) => map.get(key);

  const set = (key: K, entry: T) => {
    setMap(prev => {
      const temp = new Map(prev);
      temp.set(key, entry);
      return temp;
    });
  };

  const replace = (newMap: Iterable<readonly [K, T]>) => {
    setMap(new Map(newMap));
  };

  const remove = (key: K) => {
    setMap(prev => {
      const temp = new Map(prev);
      temp.delete(key);
      return temp;
    });
  };

  const reset = () => {
    setMap(new Map(getInitValue()));
  };

  return [
    map,
    {
      get: useMemoizedFn(get),
      set: useMemoizedFn(set),
      replace: useMemoizedFn(replace),
      remove: useMemoizedFn(remove),
      reset: useMemoizedFn(reset),
    },
  ] as const;
}
