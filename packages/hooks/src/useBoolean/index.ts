import { useMemo } from 'react';

import useToggle from '../useToggle';

/**
 * 优雅的管理 boolean 状态的 Hook。
 * @param defaultValue 默认值为false
 * @returns
 */
export default function useBoolean(defaultValue = false) {
  const [state, { toggle, set }] = useToggle(defaultValue);

  const actions = useMemo(() => {
    const setTrue = () => set(true);
    const setFalse = () => set(false);
    return {
      toggle,
      set: (v: boolean) => set(!!v),
      setTrue,
      setFalse,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [state, actions] as const;
}
