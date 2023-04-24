import { DependencyList, EffectCallback, useEffect, useState } from 'react';

import type { ThrottleOptions } from '../useThrottle/ThrottleOptions';
import useThrottleFn from '../useThrottleFn';
import useUpdateEffect from '../useUpdateEffect';

/**
 * 为 `useEffect` 增加节流的能力。
 */
export default function useThrottleEffect(effect: EffectCallback, deps?: DependencyList, options?: ThrottleOptions) {
  const [flag, setFlag] = useState({});

  const { run } = useThrottleFn(() => {
    setFlag({});
  }, options);

  useEffect(() => {
    return run();
  }, deps);

  useUpdateEffect(effect, [flag]);
}
