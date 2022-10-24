import { useEffect, useState } from 'react';

import useThrottleFn from '../useThrottleFn';
import type { ThrottleOptions } from './ThrottleOptions';

/**
 * 用来处理节流值的 Hook。
 * @param value 需要节流的值
 * @param options 配置节流的行为
 * @returns
 */
export default function useThrottle<T>(value: T, options?: ThrottleOptions) {
  const [throttled, setThrottled] = useState(value);

  const { run } = useThrottleFn(() => {
    setThrottled(value);
  }, options);

  useEffect(() => {
    run();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return throttled;
}
