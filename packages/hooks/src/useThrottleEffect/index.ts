import { EffectCallback, DependencyList, useState, useEffect } from 'react';
import useThrottleFn from '../useThrottleFn';
import useUnmount from '../useUnmount';
import useUpdateEffect from '../useUpdateEffect';

/**
 * 为 `useEffect` 增加节流的能力。
 */
export default function useThrottleEffect(effect: EffectCallback, deps?: DependencyList, options?: ThrottleOptions) {
  const [flag, setFlag] = useState({});

  const { run, cancel } = useThrottleFn(() => {
    setFlag({});
  }, options);

  useEffect(() => {
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useUnmount(cancel);

  useUpdateEffect(effect, [flag]);
}
