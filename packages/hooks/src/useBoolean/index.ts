import useMemoizedFn from '../useMemoizedFn';
import useToggle from '../useToggle';

/**
 * 优雅的管理 boolean 状态的 Hook。
 * @param defaultValue 默认值为false
 * @returns
 */
export default function useBoolean(defaultValue = false) {
  const [state, { toggle, set }] = useToggle(defaultValue);
  const setTrue = () => set(true);
  const setFalse = () => set(false);

  const actions = {
    toggle,
    set,
    setTrue: useMemoizedFn(setTrue),
    setFalse: useMemoizedFn(setFalse),
  };

  return [state, actions] as const;
}
