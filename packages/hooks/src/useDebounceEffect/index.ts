import { DependencyList, EffectCallback, useEffect, useState } from 'react';

import type { DebounceOptions } from '../useDebounce/DebounceOptions';
import useDebounceFn from '../useDebounceFn';
import useUpdateEffect from '../useUpdateEffect';

/**
 * 为 `useEffect` 增加防抖的能力。
 * @param effect 执行函数
 * @param deps 依赖数组
 * @param options 配置防抖的行为
 */
export default function useDebounceEffect(effect: EffectCallback, deps?: DependencyList, options?: DebounceOptions) {
  const [flag, setFlag] = useState({});

  const { run } = useDebounceFn(() => {
    setFlag({});
  }, options);

  useEffect(() => {
    return run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useUpdateEffect(effect, [flag]);
}
