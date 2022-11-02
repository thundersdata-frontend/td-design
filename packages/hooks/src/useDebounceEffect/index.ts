import { DependencyList, EffectCallback, useEffect, useState } from 'react';

import type { DebounceOptions } from '../useDebounce/DebounceOptions';
import useDebounceFn from '../useDebounceFn';
import useUnmount from '../useUnmount';
import useUpdateEffect from '../useUpdateEffect';

/**
 * 为 `useEffect` 增加防抖的能力。
 * @param effect 执行函数
 * @param deps 依赖数组
 * @param options 配置防抖的行为
 */
export default function useDebounceEffect(effect: EffectCallback, deps?: DependencyList, options?: DebounceOptions) {
  const [flag, setFlag] = useState({});

  // 防抖函数会导致rerender
  const { run, cancel } = useDebounceFn(() => {
    setFlag({});
  }, options);

  // useEffect 执行防抖
  useEffect(() => {
    run();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  // 卸载时取消执行防抖
  useUnmount(cancel);

  // rerender的时候，执行函数
  useUpdateEffect(effect, [flag]);
}
