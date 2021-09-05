import { useState } from 'react';
import useMemoizedFn from '../useMemoizedFn';

/**
 * 强制组件重新渲染的 Hook。
 * @returns
 */
export default function useUpdate() {
  const [, setState] = useState({});

  return useMemoizedFn(() => setState({}));
}
