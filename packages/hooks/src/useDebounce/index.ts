import { useEffect, useState } from 'react';
import useDebounceFn from '../useDebounceFn';

/**
 * 用来处理防抖值的 Hook。
 * @param value 需要防抖的值
 * @param options 配置防抖的行为
 * @returns
 */
export default function useDebounce<T>(value: T, options?: DebounceOptions) {
  const [debounced, setDebounced] = useState(value);

  const { run } = useDebounceFn(() => {
    setDebounced(value);
  }, options);

  useEffect(() => {
    run();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]); // 每次value变化的时候，都触发debounce的run方法

  return debounced;
}
